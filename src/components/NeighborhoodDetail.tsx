import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, AlertCircle, Users, Clock, Activity } from 'lucide-react';
import { NeighborhoodChart } from '@/components/NeighborhoodChart';
import { neighborhoods } from '@/lib/data';

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'operational':
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    case 'warning':
      return <AlertCircle className="h-6 w-6 text-yellow-500" />;
    case 'critical':
      return <AlertTriangle className="h-6 w-6 text-red-500" />;
    default:
      return null;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'operational':
      return 'Serviço Normal';
    case 'warning':
      return 'Possíveis Problemas';
    case 'critical':
      return 'Serviço Interrompido';
    default:
      return 'Desconhecido';
  }
};

export default function NeighborhoodDetail() {
  const { id } = useParams();
  const neighborhood = neighborhoods.find((n) => n.id === Number(id));

  if (!neighborhood) {
    return <div>Bairro não encontrado</div>;
  }

  const recentReports = [
    {
      id: 1,
      user: 'João Silva',
      time: '15 minutos atrás',
      description: 'Internet lenta e instável',
      type: 'Lentidão',
    },
    {
      id: 2,
      user: 'Maria Santos',
      time: '1 hora atrás',
      description: 'Sem conexão',
      type: 'Sem conexão',
    },
    {
      id: 3,
      user: 'Pedro Oliveira',
      time: '2 horas atrás',
      description: 'Quedas frequentes no sinal',
      type: 'Sem conexão',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{neighborhood.name}</h2>
                <p className="text-muted-foreground">{neighborhood.description}</p>
              </div>
              {getStatusIcon(neighborhood.status)}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{neighborhood.reports} relatos</p>
                  <p className="text-xs text-muted-foreground">nas últimas 24h</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Última atualização</p>
                  <p className="text-xs text-muted-foreground">5 minutos atrás</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{getStatusText(neighborhood.status)}</p>
                  <p className="text-xs text-muted-foreground">Status atual</p>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <NeighborhoodChart status={neighborhood.status} timeframe="24h" />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Relatórios Recentes</h3>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <p className="font-medium">{report.user}</p>
                    <span className="text-xs text-muted-foreground">{report.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{report.time}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}