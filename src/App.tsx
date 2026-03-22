/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calculator, Info, Receipt, Wallet } from 'lucide-react';

type CalcMode = 'forward' | 'reverse';

export default function App() {
  const [mode, setMode] = useState<CalcMode>('forward');
  const [inputValue, setInputValue] = useState<string>('');
  
  const [result, setResult] = useState<{
    preTax: number;
    tax: number;
    postTax: number;
  } | null>(null);

  useEffect(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val) || val < 0) {
      setResult(null);
      return;
    }

    if (mode === 'forward') {
      let tax = 0;
      let preTax = val;
      if (preTax <= 800) {
        tax = 0;
      } else if (preTax <= 4000) {
        tax = (preTax - 800) * 0.2;
      } else {
        const taxableIncome = preTax * 0.8;
        if (taxableIncome <= 20000) {
          tax = taxableIncome * 0.2;
        } else if (taxableIncome <= 50000) {
          tax = taxableIncome * 0.3 - 2000;
        } else {
          tax = taxableIncome * 0.4 - 7000;
        }
      }
      setResult({
        preTax,
        tax,
        postTax: preTax - tax
      });
    } else {
      let postTax = val;
      let preTax = 0;
      if (postTax <= 800) {
        preTax = postTax;
      } else if (postTax <= 3360) {
        preTax = (postTax - 160) / 0.8;
      } else if (postTax <= 21000) {
        preTax = postTax / 0.84;
      } else if (postTax <= 49500) {
        preTax = (postTax - 2000) / 0.76;
      } else {
        preTax = (postTax - 7000) / 0.68;
      }
      setResult({
        preTax,
        tax: preTax - postTax,
        postTax
      });
    }
  }, [inputValue, mode]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-8 text-white text-center">
          <Calculator className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-2xl font-bold tracking-tight">讲课费个税计算器</h1>
          <p className="mt-2 text-indigo-100 text-sm">支持正算与反算 (劳务报酬所得)</p>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex p-1 space-x-1 bg-slate-100 rounded-xl mb-8">
            <button
              onClick={() => { setMode('forward'); setInputValue(''); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                mode === 'forward' 
                  ? 'bg-white text-indigo-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              已知价税合计 (正算)
            </button>
            <button
              onClick={() => { setMode('reverse'); setInputValue(''); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                mode === 'reverse' 
                  ? 'bg-white text-indigo-700 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              已知税后金额 (反算)
            </button>
          </div>

          {/* Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              {mode === 'forward' ? '价税合计金额 (元)' : '税后金额 (元)'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-400 sm:text-sm font-medium">¥</span>
              </div>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="block w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white text-lg transition-all outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 flex items-center gap-2 text-sm font-medium">
                  <Receipt className="w-4 h-4" />
                  价税合计 (税前)
                </span>
                <span className="font-semibold text-slate-900">
                  ¥ {result.preTax.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-rose-600">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Calculator className="w-4 h-4" />
                  应纳个税
                </span>
                <span className="font-semibold">
                  - ¥ {result.tax.toFixed(2)}
                </span>
              </div>
              
              <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                <span className="text-slate-700 font-medium flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-emerald-500" />
                  税后金额 (到手)
                </span>
                <span className="text-2xl font-bold text-emerald-600">
                  ¥ {result.postTax.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="mt-8 bg-blue-50 rounded-xl p-4 flex gap-3 text-sm text-blue-800 border border-blue-100">
            <Info className="w-5 h-5 flex-shrink-0 text-blue-500 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">计算规则说明 (劳务报酬所得)：</p>
              <ul className="list-disc pl-4 space-y-1 text-blue-700/80">
                <li>不超过800元：免征个税</li>
                <li>800元 - 4000元：扣除800元后，按20%税率计算</li>
                <li>超过4000元：扣除20%费用后，按20%、30%、40%三级超额累进税率计算</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
