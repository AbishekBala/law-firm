import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, X, ArrowLeft } from 'lucide-react';
import { serviceService } from '@/services/serviceService';
import { ServiceItem, initialServiceItem, ServiceContent } from '@/types/service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const serviceSchema = z.object({
  en: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    points: z.array(z.string().min(1, 'Point cannot be empty')).min(1, 'At least one point is required'),
  }),
  ar: z.object({
    title: z.string().min(1, 'العنوان مطلوب'),
    description: z.string().min(1, 'الوصف مطلوب'),
    points: z.array(z.string().min(1, 'النقطة لا يمكن أن تكون فارغة')).min(1, 'مطلوب نقطة واحدة على الأقل'),
  }),
  tags: z.array(z.string().min(1, 'Tag cannot be empty')).optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

const ServiceEditor: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('en');
  const [newTag, setNewTag] = useState('');
  
  const isEditMode = !!id;
  
  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      en: { ...initialServiceItem.en, points: [...initialServiceItem.en.points] },
      ar: { ...initialServiceItem.ar, points: [...initialServiceItem.ar.points] },
      tags: []
    }
  });

  // Use useWatch to watch specific fields
  const tags = useWatch({ control, name: 'tags', defaultValue: [] }) || [];
  const enPoints = useWatch({ control, name: 'en.points', defaultValue: [] }) || [];
  const arPoints = useWatch({ control, name: 'ar.points', defaultValue: [] }) || [];
  
  useEffect(() => {
    if (isEditMode) {
      const service = serviceService.getById(id);
      if (service) {
        reset({
          en: service.en,
          ar: service.ar,
          tags: service.tags || []
        });
      } else {
        toast.error('Service not found');
        navigate('/admin/services');
      }
    }
  }, [id, isEditMode, navigate, reset]);

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    
    try {
      // Ensure all required fields are present
      const serviceData = {
        en: {
          title: data.en.title || '',
          description: data.en.description || '',
          points: data.en.points?.filter(p => p.trim() !== '') || []
        },
        ar: {
          title: data.ar.title || '',
          description: data.ar.description || '',
          points: data.ar.points?.filter(p => p.trim() !== '') || []
        },
        tags: data.tags || []
      };

      if (isEditMode && id) {
        await serviceService.update(id, serviceData);
        toast.success('Service updated successfully');
      } else {
        await serviceService.create(serviceData);
        toast.success('Service created successfully');
      }
      navigate('/admin/services');
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      const updatedTags = [...(tags || []), newTag.trim()];
      setValue('tags', updatedTags);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = (tags || []).filter(tag => tag !== tagToRemove);
    setValue('tags', updatedTags);
  };

  const addPoint = (language: 'en' | 'ar') => {
    const fieldName = `${language}.points` as const;
    const currentPoints = language === 'en' ? [...enPoints] : [...arPoints];
    setValue(fieldName, [...currentPoints, ''], { shouldValidate: true });
  };

  const removePoint = (language: 'en' | 'ar', index: number) => {
    const fieldName = `${language}.points` as const;
    const currentPoints = language === 'en' ? [...enPoints] : [...arPoints];
    const updatedPoints = currentPoints.filter((_, i) => i !== index);
    setValue(fieldName, updatedPoints, { shouldValidate: true });
  };

  return (
    <div className="admin-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" onClick={() => navigate('/admin/services')} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Services
          </Button>
          <h1 className="admin-compact-heading font-semibold text-legal-navy">
            {isEditMode ? 'Edit Service' : 'Add New Service'}
          </h1>
        </div>
        <Button 
          onClick={handleSubmit(onSubmit)} 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save Service'}
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="ar">العربية</TabsTrigger>
          </TabsList>

          <TabsContent value="en" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>English Content</CardTitle>
                <CardDescription>Service details in English</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="en.title">Title *</Label>
                  <Controller
                    name="en.title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="en.title"
                        placeholder="Enter service title in English"
                        {...field}
                      />
                    )}
                  />
                  {errors.en?.title && (
                    <p className="text-sm text-red-500">{errors.en.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="en.description">Description *</Label>
                  <Controller
                    name="en.description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="en.description"
                        placeholder="Enter service description in English"
                        rows={4}
                        {...field}
                      />
                    )}
                  />
                  {errors.en?.description && (
                    <p className="text-sm text-red-500">{errors.en.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Key Points *</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => addPoint('en')}
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Point
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {enPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex-1">
                          <Controller
                            name={`en.points.${index}`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                placeholder={`Point ${index + 1}`}
                                {...field}
                              />
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removePoint('en', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {errors.en?.points && (
                      <p className="text-sm text-red-500">{errors.en.points.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>المحتوى العربي</CardTitle>
                <CardDescription>تفاصيل الخدمة بالعربية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ar.title">العنوان *</Label>
                  <Controller
                    name="ar.title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="ar.title"
                        dir="rtl"
                        placeholder="أدخل عنوان الخدمة بالعربية"
                        {...field}
                      />
                    )}
                  />
                  {errors.ar?.title && (
                    <p className="text-sm text-red-500" dir="rtl">{errors.ar.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ar.description">الوصف *</Label>
                  <Controller
                    name="ar.description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="ar.description"
                        dir="rtl"
                        placeholder="أدخل وصف الخدمة بالعربية"
                        rows={4}
                        {...field}
                      />
                    )}
                  />
                  {errors.ar?.description && (
                    <p className="text-sm text-red-500" dir="rtl">{errors.ar.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>النقاط الرئيسية *</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => addPoint('ar')}
                    >
                      <Plus className="h-4 w-4 ml-1" /> إضافة نقطة
                    </Button>
                  </div>
                  <div className="space-y-2">
                  {arPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex-1">
                          <Controller
                            name={`ar.points.${index}`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                dir="rtl"
                                placeholder={`النقطة ${index + 1}`}
                                {...field}
                              />
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removePoint('ar', index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {errors.ar?.points && (
                      <p className="text-sm text-red-500" dir="rtl">{errors.ar.points.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Add tags to help categorize this service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="max-w-md">
                <Input
                  placeholder="Type a tag and press Enter to add"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={addTag}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default ServiceEditor;
