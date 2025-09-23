import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, X, Check, ChevronDown, ChevronUp, Languages } from 'lucide-react';
import { serviceService, initializeDefaultServices } from '@/services/serviceService';
import { ServiceItem, initialServiceItem } from '@/types/service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText } from 'lucide-react';

interface PointInputProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  placeholder?: string;
}

const ServicesList: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [pageData, setPageData] = useState({ 
    superHeading: { en: '', ar: '' }, 
    superDescription: { en: '', ar: '' } 
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [newService, setNewService] = useState<Omit<ServiceItem, 'id' | 'createdAt' | 'updatedAt'>>(initialServiceItem);
  const [newTag, setNewTag] = useState('');
  const [activeTab, setActiveTab] = useState('en');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      // Load page data and services
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
      const success = serviceService.delete(serviceToDelete);
      if (success) {
        setServices(services.filter(s => s.id !== serviceToDelete));
        toast.success('Service deleted successfully');
      } else {
        throw new Error('Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    } finally {
      setIsDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
  };

  const handleAddService = () => {
    setNewService(initialServiceItem);
    setIsAddingNew(true);
  };

  const handleCancelAdd = () => {
    setIsAddingNew(false);
    setNewService(initialServiceItem);
    setNewTag('');
  };

  const handleSaveService = async () => {
    try {
      const savedService = serviceService.create(newService);
      setServices([...services, savedService]);
      toast.success('Service added successfully');
      setIsAddingNew(false);
      setNewService(initialServiceItem);
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    }
  };

  const addTag = () => {
    if (newTag.trim() && !newService.tags.includes(newTag.trim())) {
      setNewService({
        ...newService,
        tags: [...newService.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewService({
      ...newService,
      tags: newService.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const addPoint = () => {
    const lang = activeTab as 'en' | 'ar';
    setNewService({
      ...newService,
      [lang]: {
        ...newService[lang],
        points: [...newService[lang].points, '']
      }
    });
  };

  const updatePoint = (index: number, value: string) => {
    const lang = activeTab as 'en' | 'ar';
    const newPoints = [...newService[lang].points];
    newPoints[index] = value;
    setNewService({
      ...newService,
      [lang]: {
        ...newService[lang],
        points: newPoints
      }
    });
  };

  const removePoint = (index: number) => {
    const lang = activeTab as 'en' | 'ar';
    const newPoints = newService[lang].points.filter((_, i) => i !== index);
    setNewService({
      ...newService,
      [lang]: {
        ...newService[lang],
        points: newPoints
      }
    });
  };

  const filteredServices = services.filter(service => 
    service.en.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.ar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // PointInput component for rendering individual points
  const PointInput: React.FC<PointInputProps> = ({ value, onChange, onRemove, placeholder }) => (
    <div className="flex items-center gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Enter key point'}
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

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleAddService}
            className="bg-legal-navy hover:bg-legal-navy/90 text-white whitespace-nowrap"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">No services found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchTerm ? 'Try a different search term' : 'Get started by adding a new service'}
          </p>
          <Button onClick={handleAddService}>
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-1">{service.en.title}</CardTitle>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => navigate(`/admin/services/edit/${service.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive/90"
                      onClick={() => handleDeleteClick(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="line-clamp-2 h-10">
                  {service.en.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mt-2">
                  {service.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Service Dialog */}
      {isAddingNew && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Add New Service</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">English</span>
                    <Switch
                      checked={isRtl}
                      onCheckedChange={setIsRtl}
                      className="data-[state=checked]:bg-legal-navy"
                    />
                    <span className="text-sm text-muted-foreground">العربية</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancelAdd}
                    className="text-muted-foreground"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="space-y-4"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="ar">العربية</TabsTrigger>
                </TabsList>
                
                <TabsContent value="en" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="en-title">Title (English)</Label>
                    <Input
                      id="en-title"
                      value={newService.en.title}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          en: { ...newService.en, title: e.target.value },
                        })
                      }
                      placeholder="Enter service title in English"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="en-description">Description (English)</Label>
                    <Textarea
                      id="en-description"
                      value={newService.en.description}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          en: { ...newService.en, description: e.target.value },
                        })
                      }
                      placeholder="Enter service description in English"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Key Points (English)</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={addPoint}
                        className="text-sm text-legal-navy hover:text-legal-navy/90"
                      >
                        <Plus className="mr-1 h-3.5 w-3.5" /> Add Point
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {newService.en.points.map((point, index) => (
                        <PointInput
                          key={index}
                          value={point}
                          onChange={(value) => updatePoint(index, value)}
                          onRemove={() => removePoint(index)}
                          placeholder={`Key point ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="ar" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ar-title">العنوان (بالعربية)</Label>
                    <Input
                      id="ar-title"
                      dir="rtl"
                      value={newService.ar.title}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          ar: { ...newService.ar, title: e.target.value },
                        })
                      }
                      placeholder="أدخل عنوان الخدمة بالعربية"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ar-description">الوصف (بالعربية)</Label>
                    <Textarea
                      id="ar-description"
                      dir="rtl"
                      value={newService.ar.description}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          ar: { ...newService.ar, description: e.target.value },
                        })
                      }
                      placeholder="أدخل وصف الخدمة بالعربية"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>النقاط الرئيسية (بالعربية)</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={addPoint}
                        className="text-sm text-legal-navy hover:text-legal-navy/90"
                      >
                        <Plus className="ml-1 h-3.5 w-3.5" /> إضافة نقطة
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {newService.ar.points.map((point, index) => (
                        <PointInput
                          key={index}
                          value={point}
                          onChange={(value) => updatePoint(index, value)}
                          onRemove={() => removePoint(index)}
                          placeholder={`النقطة الرئيسية ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add a tag and press Enter"
                      className="flex-1"
                    />
                    <Button type="button" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newService.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="pl-3 pr-1 py-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1.5 rounded-full hover:bg-muted p-0.5"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Super Heading</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        value={pageData.superHeading.en}
                        onChange={(e) =>
                          setPageData({
                            ...pageData,
                            superHeading: { ...pageData.superHeading, en: e.target.value },
                          })
                        }
                        placeholder="English super heading"
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        dir="rtl"
                        value={pageData.superHeading.ar}
                        onChange={(e) =>
                          setPageData({
                            ...pageData,
                            superHeading: { ...pageData.superHeading, ar: e.target.value },
                          })
                        }
                        placeholder="العنوان الرئيسي بالعربية"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Super Description</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Textarea
                        value={pageData.superDescription.en}
                        onChange={(e) =>
                          setPageData({
                            ...pageData,
                            superDescription: { ...pageData.superDescription, en: e.target.value },
                          })
                        }
                        placeholder="English super description"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        dir="rtl"
                        value={pageData.superDescription.ar}
                        onChange={(e) =>
                          setPageData({
                            ...pageData,
                            superDescription: { ...pageData.superDescription, ar: e.target.value },
                          })
                        }
                        placeholder="الوصف الرئيسي بالعربية"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancelAdd}>
                Cancel
              </Button>
              <Button onClick={handleSaveService} className="bg-legal-navy hover:bg-legal-navy/90">
                Save Service
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this service. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
        return;
      }
      
      // Set the services and page data
      console.log(`Setting ${data.services.length} services to state`);
      setServices(data.services);
      setPageData({
        superHeading: data.superHeading || { en: 'Our Services', ar: 'خدماتنا' },
        superDescription: data.superDescription || { 
          en: 'Comprehensive legal services',
          ar: 'خدمات قانونية شاملة'
        }
      });
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

  const handleDeleteConfirm = () => {
    if (serviceToDelete) {
      const success = serviceService.delete(serviceToDelete);
      if (success) {
        toast.success('Service deleted successfully');
        loadServices();
      } else {
        toast.error('Failed to delete service');
      }
      setIsDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
  };

  const filteredServices = services.filter(service => {
    const search = searchTerm.toLowerCase();
    return (
      service.en.title.toLowerCase().includes(search) ||
      service.ar.title.toLowerCase().includes(search) ||
      (service.tags?.some(tag => tag.toLowerCase().includes(search)) || false)
    );
  });

  console.log('Rendering ServicesList with services:', services);
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-legal-navy"></div>
      </div>
    );
  }

  // Render empty state
  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No services found</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new service.</p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/services/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-legal-navy hover:bg-legal-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-legal-navy"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            New Service
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-fade-in space-y-6 p-4 md:p-6">
      {/* Debug info - remove in production */}
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 max-w-xs text-xs opacity-90 border border-red-200">
        <div className="font-bold mb-2 text-red-600">Debug Panel</div>
        <div className="mb-2">
          <span className="font-medium">Services:</span> {services.length}
        </div>
        <div className="mb-2">
          <span className="font-medium">Filtered:</span> {filteredServices.length}
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <button 
            onClick={() => {
              console.log('Current services:', services);
              toast.info('Check console for services data');
            }}
            className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
          >
            Log Services Data
          </button>
          <button 
            onClick={() => {
              localStorage.removeItem('law_firm_services');
              toast.success('Services data reset. Refreshing...');
              setTimeout(() => window.location.reload(), 1000);
            }}
            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded"
          >
            Reset Services Data
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="admin-compact-heading font-semibold text-legal-navy">Services Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage your law firm's services in both English and Arabic
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Search services..."
            className="max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button 
            onClick={() => navigate('/admin/services/new')} 
            className="whitespace-nowrap bg-legal-gold hover:bg-legal-gold/90 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Page Settings</CardTitle>
            <CardDescription>Update the main services page content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Super Heading</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">English</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={pageData.superHeading.en}
                      onChange={(e) => {
                        const newData = { ...pageData, superHeading: { ...pageData.superHeading, en: e.target.value } };
                        setPageData(newData);
                        serviceService.updatePageData({ 
                          superHeading: { 
                            en: e.target.value, 
                            ar: pageData.superHeading.ar 
                          } 
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Arabic</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded text-right"
                      value={pageData.superHeading.ar}
                      dir="rtl"
                      onChange={(e) => {
                        const newData = { ...pageData, superHeading: { ...pageData.superHeading, ar: e.target.value } };
                        setPageData(newData);
                        serviceService.updatePageData({ 
                          superHeading: { 
                            en: pageData.superHeading.en,
                            ar: e.target.value 
                          } 
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Super Description</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">English</label>
                    <textarea
                      className="w-full p-2 border rounded min-h-[80px]"
                      value={pageData.superDescription.en}
                      onChange={(e) => {
                        const newData = { ...pageData, superDescription: { ...pageData.superDescription, en: e.target.value } };
                        setPageData(newData);
                        serviceService.updatePageData({ 
                          superDescription: { 
                            en: e.target.value,
                            ar: pageData.superDescription.ar 
                          } 
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Arabic</label>
                    <textarea
                      className="w-full p-2 border rounded min-h-[80px] text-right"
                      dir="rtl"
                      value={pageData.superDescription.ar}
                      onChange={(e) => {
                        const newData = { ...pageData, superDescription: { ...pageData.superDescription, ar: e.target.value } };
                        setPageData(newData);
                        serviceService.updatePageData({ 
                          superDescription: { 
                            en: pageData.superDescription.en,
                            ar: e.target.value 
                          } 
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Services</CardTitle>
                <CardDescription>Manage your services ({filteredServices.length} total)</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button 
                  onClick={() => navigate('/admin/services/new')}
                  className="bg-legal-gold hover:bg-legal-gold/90 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Super Heading</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="superHeading">Super Heading (English)</Label>
                    <Input
                      id="superHeading"
                      value={pageData.superHeading.en}
                      onChange={(e) =>
                        setPageData({
                          ...pageData,
                          superHeading: { ...pageData.superHeading, en: e.target.value },
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="superDescription">Super Description (English)</Label>
                    <Textarea
                      id="superDescription"
                      value={pageData.superDescription.en}
                      onChange={(e) =>
                        setPageData({
                          ...pageData,
                          superDescription: { ...pageData.superDescription, en: e.target.value },
                        })
                      }
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div className="pt-2">
                    <Button 
                      onClick={() => {
                        serviceService.updatePageData({
                          superHeading: pageData.superHeading,
                          superDescription: pageData.superDescription,
                        });
                        toast.success('Page settings saved');
                      }} 
                      className="bg-legal-navy hover:bg-legal-navy/90"
                    >
                      Save Page Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Services</CardTitle>
                <CardDescription>Manage your law firm's services</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">
                  {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new service.</p>
                <div className="mt-6">
                  <Button
                    onClick={() => navigate('/admin/services/new')}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-legal-navy hover:bg-legal-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-legal-navy"
                  >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    New Service
                  </Button>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden bg-white rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredServices.map((service) => (
                    <div key={service.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {service.en.title || 'Untitled Service'}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {service.en.description || 'No description available'}
                          </p>
                          {service.tags && service.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {service.tags.slice(0, 3).map((tag, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {service.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{service.tags.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-500 hover:text-legal-navy"
                            onClick={() => navigate(`/admin/services/edit/${service.id}`)}
                            title="Edit service"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                            onClick={() => handleDeleteClick(service.id)}
                            title="Delete service"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-4 border-t mt-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/admin/services/edit/${service.id}`)}
                          className="flex-1 sm:flex-initial"
                        >
                          <Edit className="h-4 w-4 mr-2" /> Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteClick(service.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the service. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServicesList;
