import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { serviceService } from '@/services/serviceService';
import { ServiceItem } from '@/types/service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const ServicesList: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [pageData, setPageData] = useState({ superHeading: { en: '', ar: '' }, superDescription: { en: '', ar: '' } });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    setIsLoading(true);
    try {
      const data = serviceService.getAll();
      setServices(data.services);
      setPageData({
        superHeading: data.superHeading,
        superDescription: data.superDescription
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

  return (
    <div className="admin-fade-in space-y-6 p-4 md:p-6">
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
          <Button onClick={() => navigate('/admin/services/new')} className="whitespace-nowrap">
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
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Services</CardTitle>
                <CardDescription>Manage your law firm's services</CardDescription>
              </div>
              <div className="text-sm text-muted-foreground">
                {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
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
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="flex gap-2 mt-2">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="text-muted-foreground">
                  {searchTerm ? (
                    <p>No services match your search. Try a different term.</p>
                  ) : (
                    <p>No services found. Add your first service to get started.</p>
                  )}
                </div>
                <Button 
                  onClick={() => {
                    setSearchTerm('');
                    navigate('/admin/services/new');
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Service
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredServices.map((service) => (
                  <Card key={service.id} className="h-full flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2" title={service.en.title}>
                          {service.en.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3" title={service.en.description}>
                          {service.en.description}
                        </p>
                        {service.tags && service.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {service.tags.slice(0, 3).map((tag, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
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
                      <div className="flex justify-end gap-2 pt-4 border-t mt-auto">
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
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteClick(service.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
