import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/lib/auth';

const serviceConfigSchema = z.object({
  serviceId: z.string(),
  customPrice: z.string(),
  customDuration: z.string()
});

type ServiceConfigFormData = z.infer<typeof serviceConfigSchema>;

const ProfessionalConfig = () => {
  const [services, setServices] = useState([
    { id: '1', name: 'Corte de Cabelo' },
    { id: '2', name: 'Manicure' },
    { id: '3', name: 'Pedicure' },
  ]);
  const [professionalServices, setProfessionalServices] = useState([
    { serviceId: '1', customPrice: 50, customDuration: 30 },
    { serviceId: '2', customPrice: 30, customDuration: 20 },
  ]);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log('User in ProfessionalConfig:', user);
    }
  }, [user]);

  const { register, handleSubmit, formState: { errors } } = useForm<ServiceConfigFormData>({
    resolver: zodResolver(serviceConfigSchema)
  });

  const onSubmit = (data: ServiceConfigFormData) => {
    const serviceId = data.serviceId;
    const customPrice = data.customPrice ? parseFloat(data.customPrice) : null;
    const customDuration = data.customDuration ? parseInt(data.customDuration) : null;
    
    // Handle form submission logic here
    console.log('Service config submitted:', { serviceId, customPrice, customDuration });
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Configuração de Serviços</CardTitle>
          <CardDescription>
            Configure os serviços oferecidos por seus profissionais.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="serviceId">Serviço</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="customPrice">Preço Personalizado</Label>
              <Input
                id="customPrice"
                placeholder="R$ 0,00"
                type="number"
                {...register("customPrice")}
              />
            </div>
            <div>
              <Label htmlFor="customDuration">Duração Personalizada (minutos)</Label>
              <Input
                id="customDuration"
                placeholder="0"
                type="number"
                {...register("customDuration")}
              />
            </div>
            <Button type="submit">Salvar Configuração</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Serviços Configurados</CardTitle>
          <CardDescription>
            Lista de serviços configurados para este profissional.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Serviço</TableHead>
                  <TableHead>Preço Personalizado</TableHead>
                  <TableHead>Duração Personalizada</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {professionalServices.map((service) => {
                  const serviceInfo = services.find((s) => s.id === service.serviceId);
                  return (
                    <TableRow key={service.serviceId}>
                      <TableCell className="font-medium">{serviceInfo?.name}</TableCell>
                      <TableCell>R$ {service.customPrice?.toFixed(2)}</TableCell>
                      <TableCell>{service.customDuration} minutos</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalConfig;
