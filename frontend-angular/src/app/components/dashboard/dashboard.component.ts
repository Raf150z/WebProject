import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NodeGatewayService, Stats } from '../../services/node-gateway.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: Stats | null = null;
  loading = true;
  error: string | null = null;

  constructor(private nodeGateway: NodeGatewayService) {}

  async ngOnInit(): Promise<void> {
    await this.loadStats();
  }

  async loadStats(): Promise<void> {
    try {
      this.loading = true;
      this.stats = await this.nodeGateway.getStats();
      this.error = null;
    } catch (error) {
      console.error('Error loading stats:', error);
      this.error = 'Error al cargar estadísticas';
    } finally {
      this.loading = false;
    }
  }

  refresh(): void {
    this.loadStats();
  }
}
