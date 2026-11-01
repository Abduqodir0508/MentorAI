'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Receipt,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { formatUZS } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

export default function BillingPage() {
  const { t, language } = useLanguage();
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<'payme' | 'click' | 'stripe'>('payme');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 'txn_payme_98412',
      date: 'Nov 01, 2026',
      amount: 150000,
      provider: 'Payme Uzbekistan',
      status: 'Paid',
    },
  ]);

  useEffect(() => {
    const savedRole = localStorage.getItem('mentorai_role') as 'student' | 'admin';
    if (savedRole) setRole(savedRole);

    const savedSub = localStorage.getItem('mentorai_subscribed');
    if (savedSub !== null) {
      setIsSubscribed(savedSub === 'true');
    }
  }, []);

  const handleSimulatePayment = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: selectedProvider,
          amount: 150000,
          durationMonths: 1,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSubscribed(true);
        localStorage.setItem('mentorai_subscribed', 'true');
        setTransactions((prev) => [
          {
            id: data.subscription.transaction_id,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            amount: 150000,
            provider: selectedProvider === 'payme' ? 'Payme Uzbekistan' : selectedProvider === 'click' ? 'Click Evolution' : 'Stripe International',
            status: t.billing.paid,
          },
          ...prev,
        ]);

        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });

        setIsCheckoutOpen(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const isAdmin = role === 'admin';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Top Header */}
      <div>
        <Badge variant="primary" className="mb-1">
          {t.billing.title}
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
          {t.landing.passName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {t.billing.subtitle}
        </p>
      </div>

      {/* Admin Superuser Banner if Active */}
      {isAdmin && (
        <Card className="p-5 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white border-0 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/10 text-white">
              <ShieldCheck className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <span>{t.billing.adminPassActive}</span>
                <Badge variant="primary" className="bg-purple-500/30 text-purple-200 border-purple-400/30">
                  {t.nav.adminMode}
                </Badge>
              </div>
              <p className="text-xs text-purple-200/80 mt-0.5">
                {t.billing.adminPassDesc}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Active Pass Card */}
      <Card className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t.billing.currentPlan}
              </span>
              <Badge variant={isSubscribed || isAdmin ? 'success' : 'outline'}>
                {isSubscribed || isAdmin ? t.billing.activeMonthlyPass : t.billing.expiredPass}
              </Badge>
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              {formatUZS(150000)} / {t.billing.perMonth}
            </h3>

            <p className="text-xs text-slate-500">
              {isSubscribed || isAdmin ? t.billing.activeSubDesc : t.billing.inactiveSubDesc}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!isSubscribed && !isAdmin ? (
              <Button size="lg" onClick={() => setIsCheckoutOpen(true)} className="shadow-lg shadow-indigo-600/25 font-bold">
                <Zap className="w-4 h-4 mr-2" />
                {t.billing.activatePassBtn}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  if (confirm('Cancel auto-renew pass?')) {
                    setIsSubscribed(false);
                    localStorage.setItem('mentorai_subscribed', 'false');
                  }
                }}
              >
                {t.billing.cancelAutoRenewBtn}
              </Button>
            )}
          </div>
        </div>

        {/* Feature inclusions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t.tracks.it.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t.tracks.exactSciences.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t.tracks.medicine.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t.tracks.law.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t.tracks.languages.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t.nav.aiVoiceTutor} (24/7)</span>
          </div>
        </div>
      </Card>

      {/* Payment Gateway Placeholders */}
      <div>
        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-3">
          {t.billing.supportedProviders}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card
            onClick={() => {
              setSelectedProvider('payme');
              setIsCheckoutOpen(true);
            }}
            className="p-5 hover:border-cyan-500 hover:shadow-md cursor-pointer transition-all flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-sm text-cyan-600 dark:text-cyan-400">Payme</div>
              <p className="text-[11px] text-slate-400">{t.billing.paymeSub}</p>
            </div>
            <Badge variant="outline">150,000 UZS</Badge>
          </Card>

          <Card
            onClick={() => {
              setSelectedProvider('click');
              setIsCheckoutOpen(true);
            }}
            className="p-5 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-sm text-blue-600 dark:text-blue-400">Click Evolution</div>
              <p className="text-[11px] text-slate-400">{t.billing.clickSub}</p>
            </div>
            <Badge variant="outline">150,000 UZS</Badge>
          </Card>

          <Card
            onClick={() => {
              setSelectedProvider('stripe');
              setIsCheckoutOpen(true);
            }}
            className="p-5 hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all flex items-center justify-between"
          >
            <div>
              <div className="font-bold text-sm text-indigo-600 dark:text-indigo-400">Stripe</div>
              <p className="text-[11px] text-slate-400">{t.billing.stripeSub}</p>
            </div>
            <Badge variant="outline">~$12 USD</Badge>
          </Card>
        </div>
      </div>

      {/* Transaction History */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
            {t.billing.paymentHistory}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 px-2">{t.billing.txnId}</th>
                <th className="pb-3 px-2">{t.billing.date}</th>
                <th className="pb-3 px-2">{t.billing.provider}</th>
                <th className="pb-3 px-2">{t.billing.amount}</th>
                <th className="pb-3 px-2 text-right">{t.billing.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {transactions.map((txn) => (
                <tr key={txn.id}>
                  <td className="py-3 px-2 font-mono text-slate-600 dark:text-slate-300">{txn.id}</td>
                  <td className="py-3 px-2 text-slate-500">{txn.date}</td>
                  <td className="py-3 px-2 text-slate-700 dark:text-slate-300">{txn.provider}</td>
                  <td className="py-3 px-2 font-bold text-slate-900 dark:text-slate-100">
                    {formatUZS(txn.amount)}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Badge variant="success">{txn.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Checkout Modal Simulation */}
      <Modal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title={t.billing.modalTitle}
        description={t.billing.modalDesc}
      >
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 flex justify-between items-center">
            <div>
              <div className="font-bold text-sm text-indigo-950 dark:text-indigo-200">
                {t.billing.modalPlan}
              </div>
              <div className="text-xs text-indigo-700 dark:text-indigo-300">
                {t.billing.modalPlanSub}
              </div>
            </div>
            <span className="text-lg font-black text-indigo-950 dark:text-indigo-100">
              {formatUZS(150000)}
            </span>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'payme' as const, label: 'Payme', color: 'border-cyan-500' },
                { id: 'click' as const, label: 'Click', color: 'border-blue-500' },
                { id: 'stripe' as const, label: 'Stripe Card', color: 'border-indigo-500' },
              ].map((prov) => (
                <button
                  key={prov.id}
                  type="button"
                  onClick={() => setSelectedProvider(prov.id)}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                    selectedProvider === prov.id
                      ? `${prov.color} bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20`
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {prov.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-500 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <span>{t.billing.simNotice}</span>
          </div>

          <div className="pt-2 flex gap-3">
            <Button
              className="flex-1 font-bold"
              size="lg"
              onClick={handleSimulatePayment}
              isLoading={isProcessing}
            >
              {t.billing.confirmPayBtn} ({formatUZS(150000)})
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
