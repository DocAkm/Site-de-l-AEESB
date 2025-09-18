import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, Filter, Download, CheckCircle, XCircle, Clock, Gift } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
// Mock data - in a real app, this would come from Supabase
const mockPayments = [
  { id: 'don_1', memberName: 'Fatoumata Diarra', memberEmail: 'fatou@example.com', type: 'Don', amount: 10000, currency: 'FCFA', date: '2024-05-18', status: 'completed', paymentMethod: 'Wave' },
  { id: 'cot_1', memberName: 'Moussa Coulibaly', memberEmail: 'moussa.c@example.com', type: 'Cotisation Spéciale', amount: 2000, currency: 'FCFA', date: '2024-05-22', status: 'pending', paymentMethod: 'Orange Money' },
];

const AdminPaymentsPage = () => {
  const [payments, setPayments] = useState(mockPayments);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Simulating fetching payments
  useEffect(() => {
    // In a real app, fetch payments from Supabase here based on filters
    // e.g., supabase.from('payments').select('*')...
    // For now, we just use the mock data.
    // If you add a real backend, you might want to filter server-side.
  }, []);


  const filteredPayments = payments.filter(payment => 
    (payment.memberName?.toLowerCase().includes(searchTerm.toLowerCase()) || payment.memberEmail?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === '' || payment.status === filterStatus) &&
    (filterType === '' || payment.type === filterType)
  );
  
  const handleMarkAsCompleted = (paymentId) => {
    setPayments(prev => prev.map(p => p.id === paymentId ? {...p, status: 'completed'} : p));
    toast({title: "Paiement mis à jour", description: "Le statut du paiement a été marqué comme complété."});
    // Here, you would also update the payment status in your Supabase table
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (status === 'pending') return <Clock className="h-5 w-5 text-yellow-500" />;
    if (status === 'failed') return <XCircle className="h-5 w-5 text-red-500" />;
    return <Clock className="h-5 w-5 text-gray-500" />;
  };

  const statusOptions = ['completed', 'pending', 'failed'];
  // Adhesion Annuelle is removed as it's now free
  const typeOptions = ['Don', 'Cotisation Spéciale']; 

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-aeesb-green-dark flex items-center">
            <Gift size={28} className="mr-3 text-aeesb-gold" /> Gestion des Contributions
          </CardTitle>
          <CardDescription>Suivi des dons et cotisations spéciales. L'adhésion est désormais gratuite.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 items-end">
            <Input 
              type="search" 
              placeholder="Rechercher par nom/email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:col-span-2"
            />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-aeesb-gold focus:border-aeesb-gold h-10"
            >
              <option value="">Tous les statuts</option>
              {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-aeesb-gold focus:border-aeesb-gold h-10"
            >
              <option value="">Tous les types</option>
              {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          
          <div className="flex justify-end mb-4">
            <Button variant="outline" onClick={() => toast({title: "Fonctionnalité à venir", description: "L'exportation CSV sera bientôt disponible."})}>
              <Download className="mr-2 h-4 w-4" /> Exporter en CSV (Simulé)
            </Button>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>ID Contribution</TableHead>
                  <TableHead>Nom du Contributeur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-center">Statut</TableHead>
                  <TableHead>Méthode</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length > 0 ? filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium text-xs">{payment.id}</TableCell>
                    <TableCell>{payment.memberName || payment.name || 'N/A'}</TableCell>
                    <TableCell>{payment.memberEmail || 'N/A'}</TableCell>
                    <TableCell>{payment.type}</TableCell>
                    <TableCell className="text-right">{payment.amount.toLocaleString()} {payment.currency}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        payment.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {getStatusIcon(payment.status)}
                        <span className="ml-1.5">{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</span>
                      </span>
                    </TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      {payment.status === 'pending' && (
                        <Button size="sm" variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleMarkAsCompleted(payment.id)}>
                          <CheckCircle className="mr-1 h-4 w-4" /> Valider
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )) : (
                   <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      Aucune contribution ne correspond à vos filtres.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-gray-500 mt-4">Note: La gestion réelle des contributions (validation, remboursement) nécessite une intégration avec un système de paiement et une logique backend.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPaymentsPage;
