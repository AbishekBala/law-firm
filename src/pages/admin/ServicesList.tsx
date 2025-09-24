import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, X, FileText, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { serviceService } from '@/services/serviceService';
import { ServiceItem, initialServiceItem } from '@/types/service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface PointInputProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  placeholder?: string;
}

const PointInput: React.FC<PointInputProps> = ({ value, onChange, onRemove, placeholder }) => (
  <div className="flex items-center gap-2">
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex-1"
    />
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onRemove}
      className="text-destructive hover:text-destructive/90"
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
);

const ServicesList: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pageData, setPageData] = useState({ 
    superHeading: { en: '', ar: '' }, 
    superDescription: { en: '', ar: '' }
  });
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [newService, setNewService] = useState<Omit<ServiceItem, 'id' | 'createdAt' | 'updatedAt'>>(JSON.parse(JSON.stringify(initialServiceItem)));
  const [newTag, setNewTag] = useState('');
  const [activeTab, setActiveTab] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const data = serviceService.getAll();
      setPageData({
        superHeading: data.superHeading || { en: '', ar: '' },
        superDescription: data.superDescription || { en: '', ar: '' }
      });
      setServices(data.services || []);
    } catch (error) {
      console.error('Error loading services:', error);
      toast.error('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setServiceToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!serviceToDelete) return;
    
    try {
      serviceService.delete(serviceToDelete);
      setServices(services.filter(service => service.id !== serviceToDelete));
      setIsDeleteDialogOpen(false);
      setServiceToDelete(null);
      toast.success('Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    }
  };

  const handleAddService = () => {
    setNewService(JSON.parse(JSON.stringify(initialServiceItem)));
    setEditingService(null);
    setActiveTab('en');
    setIsAddingNew(true);
  };

  const handleEditService = (service: ServiceItem) => {
    setEditingService(service);
    setNewService({
      en: { ...service.en },
      ar: { ...service.ar },
      tags: [...service.tags]
    });
    setActiveTab('en');
    setIsAddingNew(true);
  };

  const handleCancelAdd = () => {
    setIsAddingNew(false);
    setNewService(JSON.parse(JSON.stringify(initialServiceItem)));
    setEditingService(null);
    setNewTag('');
  };

  const handleSaveService = async () => {
    try {
      // Validate required fields
      if (!newService.en.title.trim() || !newService.ar.title.trim()) {
        toast.error(activeTab === 'en' ? 'Please provide a title in both English and Arabic' : 'الرجاء إدخال عنوان باللغتين الإنجليزية والعربية');
        return;
      }

      // Save page data if in add mode (editing the main service page)
      if (!editingService) {
        const updatedPageData = serviceService.updatePageData({
          superHeading: pageData.superHeading,
          superDescription: pageData.superDescription
        });
        setPageData(updatedPageData);
      }

      // Save the service
      let updatedServices = [...services];
      if (editingService) {
        const updatedService = serviceService.update(editingService.id, newService);
        updatedServices = services.map(s => s.id === editingService.id ? updatedService : s);
        setServices(updatedServices);
        toast.success(activeTab === 'en' ? 'Service updated successfully' : 'تم تحديث الخدمة بنجاح');
      } else {
        const savedService = serviceService.create(newService);
        updatedServices = [...services, savedService];
        setServices(updatedServices);
        toast.success(activeTab === 'en' ? 'Service added successfully' : 'تمت إضافة الخدمة بنجاح');
      }

      // Reset form
      setIsAddingNew(false);
      setNewService(JSON.parse(JSON.stringify(initialServiceItem)));
      setEditingService(null);
      setNewTag('');
      
    } catch (error) {
      console.error('Error saving service:', error);
      const errorMessage = activeTab === 'en' 
        ? `Failed to ${editingService ? 'update' : 'save'} service`
        : `فشل في ${editingService ? 'تحديث' : 'حفظ'} الخدمة`;
      toast.error(`${errorMessage}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const addTag = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmedTag = newTag.trim();
    if (trimmedTag && !newService.tags.includes(trimmedTag)) {
      setNewService(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewService(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addPoint = () => {
    setNewService(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        points: [...prev[activeTab].points, '']
      }
    }));
  };

  const updatePoint = (index: number, value: string) => {
    setNewService(prev => {
      const newPoints = [...prev[activeTab].points];
      newPoints[index] = value;
      return {
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          points: newPoints
        }
      };
    });
  };

  const removePoint = (index: number) => {
    setNewService(prev => {
      const newPoints = prev[activeTab].points.filter((_, i) => i !== index);
      return {
        ...prev,
        [activeTab]: {
          ...prev[activeTab],
          points: newPoints
        }
      };
    });
  };

  // Filter services based on search term
  const filteredServices = services.filter(service => 
    service.en.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.ar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pl-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with search and add button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage your law firm's services in both English and Arabic
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search services..."
              className="pl-9 w-full md:w-[200px] lg:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleAddService} className="whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" />
            Add New Service
          </Button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <Card key={service.id} className="h-full flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{service[activeTab].title}</CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">
                    {service[activeTab].description}
                  </CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEditService(service)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive/90"
                    onClick={() => handleDeleteClick(service.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {service.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  {service[activeTab].points.length} key points
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleEditService(service)}
              >
                <FileText className="mr-2 h-4 w-4" />
                {activeTab === 'en' ? 'View Details' : 'عرض التفاصيل'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add/Edit Service Dialog */}
      <Dialog open={isAddingNew} onOpenChange={(open) => {
        if (!open) {
          handleCancelAdd();
        } else {
          setIsAddingNew(true);
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>
                {activeTab === 'en' 
                  ? (editingService ? 'Edit Service' : 'Add New Service')
                  : (editingService ? 'تعديل الخدمة' : 'إضافة خدمة جديدة')}
              </DialogTitle>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => setActiveTab(prev => prev === 'en' ? 'ar' : 'en')}
                className="gap-2"
              >
                {activeTab === 'en' ? 'العربية' : 'English'}
                <Globe className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Super Content Section - Only shown when adding new service */}
            {!editingService && (
              <Card className="border">
                <CardHeader className="bg-muted/30 px-6 py-4 border-b">
                  <CardTitle className="text-base font-medium">
                    {activeTab === 'en' ? 'Super Content' : 'المحتوى الرئيسي'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor={`super-heading-${activeTab}`}>
                      {activeTab === 'en' ? 'Super Heading' : 'العنوان الرئيسي'}
                    </Label>
                    <Input
                      id={`super-heading-${activeTab}`}
                      value={pageData.superHeading[activeTab]}
                      onChange={(e) => setPageData(prev => ({
                        ...prev,
                        superHeading: {
                          ...prev.superHeading,
                          [activeTab]: e.target.value
                        }
                      }))}
                      placeholder={activeTab === 'en' 
                        ? 'Enter super heading' 
                        : 'أدخل العنوان الرئيسي'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`super-description-${activeTab}`}>
                      {activeTab === 'en' ? 'Super Description' : 'الوصف الرئيسي'}
                    </Label>
                    <Textarea
                      id={`super-description-${activeTab}`}
                      value={pageData.superDescription[activeTab]}
                      onChange={(e) => setPageData(prev => ({
                        ...prev,
                        superDescription: {
                          ...prev.superDescription,
                          [activeTab]: e.target.value
                        }
                      }))}
                      placeholder={activeTab === 'en' 
                        ? 'Enter super description' 
                        : 'أدخل الوصف الرئيسي'}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Service Details (includes Super Title, Super Description, Tags, Title, Content, Key Points Title) */}
            <Card className="border">
              <CardHeader className="bg-muted/30 px-6 py-4 border-b">
                <CardTitle className="text-base font-medium">
                  {activeTab === 'en' ? 'Service Details' : 'تفاصيل الخدمة'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Super Title */}
                <div className="space-y-2">
                  <Label htmlFor={`${activeTab}-superTitle`}>
                    {activeTab === 'en' ? 'Super Title' : 'العنوان الرئيسي'}
                  </Label>
                  <Input
                    id={`${activeTab}-superTitle`}
                    value={newService[activeTab].superTitle || ''}
                    onChange={(e) => setNewService(prev => ({
                      ...prev,
                      [activeTab]: {
                        ...prev[activeTab],
                        superTitle: e.target.value
                      }
                    }))}
                    placeholder={activeTab === 'en' ? 'e.g. Expert Legal Consultation' : 'مثال: الاستشارات القانونية المتخصصة'}
                  />
                </div>

                {/* Super Description */}
                <div className="space-y-2">
                  <Label htmlFor={`${activeTab}-superDescription`}>
                    {activeTab === 'en' ? 'Super Description' : 'الوصف الرئيسي'}
                  </Label>
                  <Textarea
                    id={`${activeTab}-superDescription`}
                    value={newService[activeTab].superDescription || ''}
                    onChange={(e) => setNewService(prev => ({
                      ...prev,
                      [activeTab]: {
                        ...prev[activeTab],
                        superDescription: e.target.value
                      }
                    }))}
                    placeholder={activeTab === 'en' ? 'e.g. Looking for expert legal advice in Saudi Arabia? Our experienced...' : 'مثال: هل تبحث عن استشارات قانونية متخصصة في السعودية؟ يقدم محامونا...'}
                    rows={2}
                  />
                </div>

                {/* Tags (moved into Service Details to match requested order) */}
                <div className="space-y-2">
                  <Label>{activeTab === 'en' ? 'Tags' : 'العلامات'}</Label>
                  <form onSubmit={addTag} className="flex flex-wrap gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addTag(e)}
                      placeholder={activeTab === 'en' ? 'Add a tag' : 'إضافة علامة'}
                      className="flex-1"
                      dir={activeTab === 'ar' ? 'rtl' : 'ltr'}
                    />
                    <Button type="submit">
                      {activeTab === 'en' ? 'Add' : 'إضافة'}
                    </Button>
                  </form>
                  {newService.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {newService.tags.map((tag) => (
                        <Badge key={tag} className="gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor={`${activeTab}-title`}>
                    {activeTab === 'en' ? 'Title' : 'العنوان'}
                  </Label>
                  <Input
                    id={`${activeTab}-title`}
                    value={newService[activeTab].title}
                    onChange={(e) => setNewService(prev => ({
                      ...prev,
                      [activeTab]: {
                        ...prev[activeTab],
                        title: e.target.value
                      }
                    }))}
                    placeholder={activeTab === 'en' 
                      ? 'Enter service title' 
                      : 'أدخل عنوان الخدمة'}
                  />
                </div>

                {/* Content (larger textarea) */}
                <div className="space-y-2">
                  <Label htmlFor={`${activeTab}-description`}>
                    {activeTab === 'en' ? 'Content' : 'المحتوى'}
                  </Label>
                  <Textarea
                    id={`${activeTab}-description`}
                    value={newService[activeTab].description}
                    onChange={(e) => setNewService(prev => ({
                      ...prev,
                      [activeTab]: {
                        ...prev[activeTab],
                        description: e.target.value
                      }
                    }))}
                    placeholder={activeTab === 'en' 
                      ? 'Enter service content' 
                      : 'أدخل محتوى الخدمة'}
                    rows={6}
                  />
                </div>

                {/* Title for Key Points moved into its own card (will appear above Key Points) */}
              </CardContent>
            </Card>

            {/* Title for Key Points Card (separate) */}
            <Card className="border">
              <CardHeader className="bg-muted/30 px-6 py-4 border-b">
                <CardTitle className="text-base font-medium">
                  {activeTab === 'en' ? 'Title for Key Points' : 'عنوان النقاط الرئيسية'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Input
                  id={`${activeTab}-keyPointsTitle`}
                  value={newService[activeTab].keyPointsTitle || ''}
                  onChange={(e) => setNewService(prev => ({
                    ...prev,
                    [activeTab]: {
                      ...prev[activeTab],
                      keyPointsTitle: e.target.value
                    }
                  }))}
                  placeholder={activeTab === 'en' ? 'e.g. Key Benefits' : 'مثال: الفوائد الرئيسية'}
                />
              </CardContent>
            </Card>

            {/* Key Points Section */}
            <Card className="border">
              <CardHeader className="bg-muted/30 px-6 py-4 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">
                    {activeTab === 'en' ? 'Key Points' : 'النقاط الرئيسية'}
                  </CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPoint}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {activeTab === 'en' ? 'Add Point' : 'إضافة نقطة'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {newService[activeTab].points.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    {activeTab === 'en' 
                      ? 'No key points added yet.' 
                      : 'لم تتم إضافة نقاط رئيسية بعد'}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {newService[activeTab].points.map((point, index) => (
                      <PointInput
                        key={index}
                        value={point}
                        onChange={(value) => updatePoint(index, value)}
                        onRemove={() => removePoint(index)}
                        placeholder={
                          activeTab === 'en' 
                            ? 'Enter key point' 
                            : 'أدخل النقطة الرئيسية'
                        }
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelAdd}
              className="px-6"
            >
              {activeTab === 'en' ? 'Cancel' : 'إلغاء'}
            </Button>
            <Button 
              type="button"
              onClick={handleSaveService}
              className="px-6 bg-legal-navy hover:bg-legal-navy/90"
            >
              {activeTab === 'en' 
                ? (editingService ? 'Update Service' : 'Save Service')
                : (editingService ? 'تحديث الخدمة' : 'حفظ الخدمة')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {activeTab === 'en' 
                ? 'Are you sure?' 
                : 'هل أنت متأكد؟'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {activeTab === 'en'
                ? 'This action cannot be undone. This will permanently delete the service.'
                : 'لا يمكن التراجع عن هذا الإجراء. سيتم حذف الخدمة بشكل دائم.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {activeTab === 'en' ? 'Cancel' : 'إلغاء'}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-destructive hover:bg-destructive/90"
            >
              {activeTab === 'en' ? 'Delete' : 'حذف'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServicesList;
