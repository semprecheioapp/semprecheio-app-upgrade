import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { initialEvents } from './event-utils';
import { Button } from "@/components/ui/button"
import { CalendarIcon, PlusIcon, PencilIcon, EyeIcon, TrashIcon } from '@radix-ui/react-icons'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarDateRangePicker } from "@/components/calendar-date-range-picker"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AgendaEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  extendedProps: {
    customerName: string;
    customerPhone?: string;
    notes?: string;
    professionalName: string;
    serviceName: string;
    status: string;
    duration: number;
  };
}

interface Appointment {
  id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  professionalName: string;
  serviceName: string;
  specialtyName?: string;
  scheduledAt: string;
  startTime?: string;
  endTime?: string;
  duration: number;
  status: string;
  notes?: string;
}

const Agenda: React.FC = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<AgendaEvent[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      customerName: 'João Silva',
      customerEmail: 'joao@example.com',
      customerPhone: '123456789',
      professionalName: 'Maria Souza',
      serviceName: 'Corte de Cabelo',
      specialtyName: 'Cabeleireiro',
      scheduledAt: '2024-07-30T10:00:00',
      startTime: '10:00',
      endTime: '11:00',
      duration: 60,
      status: 'confirmed',
      notes: 'Cliente fiel, gosta de cortes modernos.'
    },
    {
      id: '2',
      customerName: 'Ana Oliveira',
      customerEmail: 'ana@example.com',
      customerPhone: '987654321',
      professionalName: 'Carlos Pereira',
      serviceName: 'Limpeza de Pele',
      specialtyName: 'Esteticista',
      scheduledAt: '2024-07-31T14:00:00',
      startTime: '14:00',
      endTime: '15:30',
      duration: 90,
      status: 'pending',
      notes: 'Primeira vez, verificar alergias.'
    },
    {
      id: '3',
      customerName: 'Ricardo Alves',
      customerEmail: 'ricardo@example.com',
      customerPhone: '555555555',
      professionalName: 'Maria Souza',
      serviceName: 'Manicure',
      specialtyName: 'Manicure',
      scheduledAt: '2024-08-01T16:00:00',
      startTime: '16:00',
      endTime: '17:00',
      duration: 60,
      status: 'confirmed',
      notes: 'Urgente, cliente tem um evento.'
    }
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const mapEventToAppointment = (event: AgendaEvent): Appointment => {
    return {
      id: event.id,
      customerName: event.extendedProps.customerName,
      customerEmail: '', // Default empty value
      customerPhone: event.extendedProps.customerPhone || '',
      professionalName: event.extendedProps.professionalName,
      serviceName: event.extendedProps.serviceName,
      specialtyName: '', // Default empty value
      scheduledAt: event.start.toISOString(),
      startTime: event.start.toTimeString().slice(0, 5),
      endTime: event.end.toTimeString().slice(0, 5),
      duration: event.extendedProps.duration,
      status: event.extendedProps.status,
      notes: event.extendedProps.notes || ''
    };
  };

  const handleAppointmentUpdate = (updatedAppointment: Appointment) => {
    setAppointments(appointments.map(appt => appt.id === updatedAppointment.id ? updatedAppointment : appt));
    setSelectedAppointment(updatedAppointment);
  };

  const handleAppointmentDelete = (appointmentId: string) => {
    setAppointments(appointments.filter(appt => appt.id !== appointmentId));
    setSelectedAppointment(null);
    setIsViewModalOpen(false);
  };

  const events: AgendaEvent[] = appointments.map(appointment => ({
    id: appointment.id,
    title: `${appointment.customerName} - ${appointment.serviceName}`,
    start: new Date(appointment.scheduledAt),
    end: new Date(new Date(appointment.scheduledAt).getTime() + appointment.duration * 60000),
    color: appointment.status === 'confirmed' ? '#10b981' : 
           appointment.status === 'pending' ? '#f59e0b' : '#ef4444',
    extendedProps: {
      customerName: appointment.customerName,
      customerPhone: appointment.customerPhone,
      notes: appointment.notes,
      professionalName: appointment.professionalName,
      serviceName: appointment.serviceName,
      status: appointment.status,
      duration: appointment.duration
    }
  }));

  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    const appointment = mapEventToAppointment({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      color: event.backgroundColor,
      extendedProps: event.extendedProps
    });
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const handleEvents = (events: AgendaEvent[]) => {
    setCurrentEvents(events);
  };

  const renderSidebar = () => {
    return (
      <div className='p-4'>
        <section>
          <div className='flex items-center space-x-2'>
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Opções</span>
          </div>
          <Separator className="my-2" />
          <div className="space-y-2">
            <label className="inline-flex items-center space-x-2">
              <Checkbox
                id="weekends"
                checked={weekendsVisible}
                onCheckedChange={(checked) => setWeekendsVisible(!!checked)}
              />
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                Mostrar finais de semana
              </span>
            </label>
          </div>
        </section>
        <section className='mt-4'>
          <div className='flex items-center space-x-2'>
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Filtros</span>
          </div>
          <Separator className="my-2" />
          <div className="space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className='w-full justify-start'>Status <ChevronDown className="ml-auto h-4 w-4"/></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>
                  Confirmado
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Pendente
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Cancelado
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className='flex h-screen'>
      <aside className="w-64 border-r flex-none overflow-y-auto">
        {renderSidebar()}
      </aside>
      <div className='flex-1 p-4'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={events}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          // you can update a remote database when these fire:
          /*
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>

      {/* View Appointment Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Agendamento</DialogTitle>
            <DialogDescription>
              Informações detalhadas sobre o agendamento selecionado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customerName" className="text-right">
                Cliente
              </Label>
              <Input type="text" id="customerName" value={selectedAppointment?.customerName || ''} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="professionalName" className="text-right">
                Profissional
              </Label>
              <Input type="text" id="professionalName" value={selectedAppointment?.professionalName || ''} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="serviceName" className="text-right">
                Serviço
              </Label>
              <Input type="text" id="serviceName" value={selectedAppointment?.serviceName || ''} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="scheduledAt" className="text-right">
                Data/Hora
              </Label>
              <Input type="text" id="scheduledAt" value={selectedAppointment?.scheduledAt || ''} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Input type="text" id="status" value={selectedAppointment?.status || ''} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notas
              </Label>
              <Textarea id="notes" value={selectedAppointment?.notes || ''} className="col-span-3" disabled />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={() => setIsViewModalOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Agenda;

import { ChevronDown } from "lucide-react"
