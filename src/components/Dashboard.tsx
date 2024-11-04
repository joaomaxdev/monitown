import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertTriangle, CheckCircle, AlertCircle, Search } from 'lucide-react';
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

export default function Dashboard() {
  const [selectedTime, setSelectedTime] = useState('24h');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNeighborhoods = neighborhoods.filter((neighborhood) =>
    neighborhood.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Monitor de Status da Rede</h2>
        <p className="text-muted-foreground">Status em tempo real do serviço de internet nos bairros</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Pesquisar bairro..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mb-6">
        <Button
          variant={selectedTime === '24h' ? 'default' : 'outline'}
          onClick={() => setSelectedTime('24h')}
        >
          Últimas 24 Horas
        </Button>
        <Button
          variant={selectedTime === '7d' ? 'default' : 'outline'}
          onClick={() => setSelectedTime('7d')}
        >
          Últimos 7 Dias
        </Button>
        <Button
          variant={selectedTime === '30d' ? 'default' : 'outline'}
          onClick={() => setSelectedTime('30d')}
        >
          Últimos 30 Dias
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNeighborhoods.map((neighborhood) => (
          <Link key={neighborhood.id} to={`/neighborhood/${neighborhood.id}`}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{neighborhood.name}</h3>
                  <p className="text-sm text-muted-foreground">{neighborhood.description}</p>
                </div>
                {getStatusIcon(neighborhood.status)}
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {getStatusText(neighborhood.status)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {neighborhood.reports} {neighborhood.reports === 1 ? 'relato' : 'relatos'}
                  </span>
                </div>
              </div>

              <div className="h-[200px] w-full">
                <NeighborhoodChart status={neighborhood.status} timeframe={selectedTime} />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}