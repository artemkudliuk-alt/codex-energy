/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MetricItem {
  id: string;
  value: string;
  label: string;
  sublabel?: string;
  icon: string; // Name of Lucide icon
}

export interface WhyInvestItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  stat?: string;
}

export interface PipelineStep {
  number: string;
  title: string;
  subtitle: string;
  iconName: string;
  details: string;
}

export interface CalculatorState {
  investment: number;
  term: number;
  reinvestmentRate: number; // 0, 0.5, 1 (0%, 50%, 100%)
  scenario: 'base' | 'optimistic';
}

export interface YearData {
  year: number;
  baseVal: number;
  optimisticVal: number;
}

export interface CalculatorResult {
  averageYield: string;
  netProfit: number;
  totalValue: number;
  chartData: YearData[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  capacity: string;
  storage: string;
  greenEnergy: string;
  timeline: string;
  description: string;
}

export interface AnalyticsMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

export interface LiveFeedItem {
  id: string;
  timestamp: string;
  unit: string;
  message: string;
  status: 'active' | 'pending' | 'warning';
}
