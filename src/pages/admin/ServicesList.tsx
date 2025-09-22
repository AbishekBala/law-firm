import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { serviceService, initializeDefaultServices } from '@/services/serviceService';
import { ServiceItem } from '@/types/service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

  const loadServices = async () => {
    setIsLoading(true);
    try {
      console.log('Initializing default services...');
      // First, ensure default services are initialized
      initializeDefaultServices();
      
      console.log('Fetching all services...');
      // Then get all services
      const data = serviceService.getAll();
      console.log('Fetched services data:', data);
      
      if (!data || !data.services || data.services.length === 0) {
        console.error('No services found after initialization');
        toast.error('No services found. Please check the console for details.');
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
