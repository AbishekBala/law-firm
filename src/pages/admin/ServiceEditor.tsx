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
    superTitle: z.string().min(1, 'Super Title is required'),
    superDescription: z.string().min(1, 'Super Description is required'),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Content is required'),
    keyPointsTitle: z.string().min(1, 'Title for Key Points is required'),
    points: z.array(z.string().min(1, 'Point cannot be empty')).min(1, 'At least one point is required'),
  }),
  ar: z.object({
    superTitle: z.string().min(1, 'العنوان الرئيسي مطلوب'),
    superDescription: z.string().min(1, 'الوصف الرئيسي مطلوب'),
    title: z.string().min(1, 'العنوان مطلوب'),
    description: z.string().min(1, 'المحتوى مطلوب'),
    keyPointsTitle: z.string().min(1, 'عنوان النقاط الرئيسية مطلوب'),
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
      en: {
        superTitle: '',
        superDescription: '',
        title: '',
        description: '',
        keyPointsTitle: '',
        points: ['']
      },
      ar: {
        superTitle: '',
        superDescription: '',
        title: '',
        description: '',
        keyPointsTitle: '',
        points: ['']
      },
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
          en: {
            superTitle: service.en.superTitle || '',
            superDescription: service.en.superDescription || '',
            title: service.en.title || '',
            description: service.en.description || '',
            keyPointsTitle: service.en.keyPointsTitle || '',
            points: service.en.points || ['']
          },
          ar: {
            superTitle: service.ar.superTitle || '',
            superDescription: service.ar.superDescription || '',
            title: service.ar.title || '',
            description: service.ar.description || '',
            keyPointsTitle: service.ar.keyPointsTitle || '',
            points: service.ar.points || ['']
          },
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
          superTitle: data.en.superTitle || '',
          superDescription: data.en.superDescription || '',
          title: data.en.title || '',
          description: data.en.description || '',
          keyPointsTitle: data.en.keyPointsTitle || '',
          points: data.en.points?.filter(p => p.trim() !== '') || []
        },
        ar: {
          superTitle: data.ar.superTitle || '',
          superDescription: data.ar.superDescription || '',
          title: data.ar.title || '',
          description: data.ar.description || '',
          keyPointsTitle: data.ar.keyPointsTitle || '',
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

          {/* ENGLISH TAB */}
          <TabsContent value="en" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Details (English)</CardTitle>
                <CardDescription>Enter the main details for this service in English</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="en.superTitle">Super Title *</Label>
                  <Controller
                    name="en.superTitle"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="en.superTitle"
                        placeholder="Enter super title in English"
                        {...field}
                      />
                    )}
                  />
                  {errors.en?.superTitle && (
                    <p className="text-sm text-red-500">{errors.en.superTitle.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="en.superDescription">Super Description *</Label>
                  <Controller
                    name="en.superDescription"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="en.superDescription"
                        placeholder="Enter super description in English"
                        rows={2}
                        {...field}
                      />
                    )}
                  />
                  {errors.en?.superDescription && (
                    <p className="text-sm text-red-500">{errors.en.superDescription.message}</p>
                  )}
                </div>
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
                  <Label htmlFor="en.description">Content *</Label>
                  <Controller
                    name="en.description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="en.description"
                        placeholder="Enter service content in English"
                        rows={6}
                        {...field}
                      />
                    )}
                  />
                  {errors.en?.description && (
                    <p className="text-sm text-red-500">{errors.en.description.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="en.keyPointsTitle">Title for Key Points *</Label>
                  <Controller
                    name="en.keyPointsTitle"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="en.keyPointsTitle"
                        placeholder="Enter title for key points in English"
                        {...field}
                      />
                    )}
                  />
                  {errors.en?.keyPointsTitle && (
                    <p className="text-sm text-red-500">{errors.en.keyPointsTitle.message}</p>
                  )}
                </div>
                {/* keyPointsTitle moved below into its own card above Key Points */}
                <Card>
                  <CardHeader>
                    <CardTitle>Title for Key Points</CardTitle>
                    <CardDescription>Heading displayed above the key points</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-2">
                      <Label htmlFor="en.keyPointsTitle">Title for Key Points *</Label>
                      <Controller
                        name="en.keyPointsTitle"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="en.keyPointsTitle"
                            placeholder="Enter title for key points in English"
                            {...field}
                          />
                        )}
                      />
                      {errors.en?.keyPointsTitle && (
                        <p className="text-sm text-red-500">{errors.en.keyPointsTitle.message}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
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

          {/* ARABIC TAB */}
          <TabsContent value="ar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تفاصيل الخدمة (بالعربية)</CardTitle>
                <CardDescription>أدخل التفاصيل الرئيسية لهذه الخدمة بالعربية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ar.superTitle">العنوان الرئيسي *</Label>
                  <Controller
                    name="ar.superTitle"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="ar.superTitle"
                        dir="rtl"
                        placeholder="أدخل العنوان الرئيسي بالعربية"
                        {...field}
                      />
                    )}
                  />
                  {errors.ar?.superTitle && (
                    <p className="text-sm text-red-500" dir="rtl">{errors.ar.superTitle.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ar.superDescription">الوصف الرئيسي *</Label>
                  <Controller
                    name="ar.superDescription"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="ar.superDescription"
                        dir="rtl"
                        placeholder="أدخل الوصف الرئيسي بالعربية"
                        rows={2}
                        {...field}
                      />
                    )}
                  />
                  {errors.ar?.superDescription && (
                    <p className="text-sm text-red-500" dir="rtl">{errors.ar.superDescription.message}</p>
                  )}
                </div>
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
                  <Label htmlFor="ar.description">المحتوى *</Label>
                  <Controller
                    name="ar.description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="ar.description"
                        dir="rtl"
                        placeholder="أدخل محتوى الخدمة بالعربية"
                        rows={6}
                        {...field}
                      />
                    )}
                  />
                  {errors.ar?.description && (
                    <p className="text-sm text-red-500" dir="rtl">{errors.ar.description.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ar.keyPointsTitle">عنوان النقاط الرئيسية *</Label>
                  <Controller
                    name="ar.keyPointsTitle"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="ar.keyPointsTitle"
                        dir="rtl"
                        placeholder="أدخل عنوان النقاط الرئيسية بالعربية"
                        {...field}
                      />
                    )}
                  />
                  {errors.ar?.keyPointsTitle && (
                    <p className="text-sm text-red-500" dir="rtl">{errors.ar.keyPointsTitle.message}</p>
                  )}
                </div>
                {/* keyPointsTitle moved below into its own card above Key Points */}
                <Card>
                  <CardHeader>
                    <CardTitle>عنوان النقاط الرئيسية</CardTitle>
                    <CardDescription>العنوان الذي سيظهر أعلى النقاط الرئيسية</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2" dir="rtl">
                    <div className="space-y-2">
                      <Label htmlFor="ar.keyPointsTitle">عنوان النقاط الرئيسية *</Label>
                      <Controller
                        name="ar.keyPointsTitle"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="ar.keyPointsTitle"
                            dir="rtl"
                            placeholder="أدخل عنوان النقاط الرئيسية بالعربية"
                            {...field}
                          />
                        )}
                      />
                      {errors.ar?.keyPointsTitle && (
                        <p className="text-sm text-red-500" dir="rtl">{errors.ar.keyPointsTitle.message}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
