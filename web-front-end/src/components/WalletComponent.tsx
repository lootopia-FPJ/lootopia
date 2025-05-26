/* eslint-disable max-lines-per-function */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '../hooks/UserContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import TextComponent from '../components/ui/TextComponent'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'

const crownPacks = [
  { id: 'pack_10', crowns: 10, price: 1.99 },
  { id: 'pack_25', crowns: 25, price: 4.99 },
  { id: 'pack_50', crowns: 50, price: 8.99 },
  { id: 'pack_100', crowns: 100, price: 16.99 },
]

const validateUserId = (user: any): number | null => {
  if (!user?.id) {
    toast.error('Utilisateur non valide')
    return null
  }
  return user.id
}

const WalletComponent = () => {
  const { user } = useUser()
  const [balance, setBalance] = useState<number | null>(null)
  const [transactions, setTransactions] = useState<any[]>([])

  useEffect(() => {
    if (user?.id) {
      fetchBalance()
      fetchTransactions()
    }
  }, [user?.id])

  const fetchBalance = async () => {
    const userId = validateUserId(user)
    if (!userId) return

    try {
      const url = `${import.meta.env.VITE_WALLET_URL}/${userId}`
      const res = await axios.get(url, { withCredentials: true })
      setBalance(res.data)
    } catch {
      toast.error('Erreur lors du chargement du solde')
    }
  }

  const fetchTransactions = async () => {
    const userId = validateUserId(user)
    if (!userId) return

    try {
      const url = `${import.meta.env.VITE_WALLET_URL}/${userId}/transactions`
      const res = await axios.get(url, { withCredentials: true })
      setTransactions(res.data)
    } catch {
      toast.error('Erreur lors du chargement des transactions')
    }
  }

  const handleBuy = async (packId: string) => {
    const userId = validateUserId(user)
    if (!userId) return

    try {
      const url = import.meta.env.VITE_STRIPE_CHECKOUT_URL
      const res = await axios.post(url, { packId }, { withCredentials: true })

      if (res.data?.url) {
        window.location.href = res.data.url
      } else {
        toast.error('URL Stripe non reçue.')
      }
    } catch {
      toast.error('Erreur lors de la création de la session Stripe')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-8">
      <ToastContainer />
      <TextComponent as="h1" className="text-center mb-6 text-gray-800">
        Mon Portefeuille
      </TextComponent>

      <div className="mb-8 text-center text-xl text-gray-700">
        <TextComponent as="p" className="text-xl text-gray-700">
          Solde actuel :{' '}
          <span className="font-bold text-green-600">
            {balance !== null ? `${balance} 👑` : 'Chargement...'}
          </span>
        </TextComponent>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {crownPacks.map((pack) => (
          <Card key={pack.id} className="p-4 shadow-md bg-white text-center">
            <CardHeader>
              <CardTitle>{pack.crowns} Couronnes</CardTitle>
            </CardHeader>
            <CardContent>
              <TextComponent as="p" className="text-gray-600 mb-4">
                {pack.price} €
              </TextComponent>
              <Button className="w-full text-black" onClick={() => handleBuy(pack.id)}>
                Acheter
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
        <TextComponent as="h2" className="text-2xl font-semibold mb-4">
          Historique des transactions
        </TextComponent>

        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx, index) => (
              <TableRow key={index}>
                <TableCell className={tx.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}>
                  {tx.type}
                </TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>{new Date(tx.transactionDate).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {transactions.length === 0 && (
          <TextComponent as="p" className="text-center text-gray-500 mt-4">
            Aucune transaction enregistrée.
          </TextComponent>
        )}
      </div>
    </div>
  )
}

export default WalletComponent
