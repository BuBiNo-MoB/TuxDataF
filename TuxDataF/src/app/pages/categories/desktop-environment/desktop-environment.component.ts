import { Component, OnInit } from '@angular/core';
import { iDistribution } from '../../../models/distribution';
import { DistributionService } from '../../../services/distribution.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desktop-environment',
  templateUrl: './desktop-environment.component.html',
  styleUrls: ['./desktop-environment.component.scss']
})
export class DesktopEnvironmentComponent implements OnInit {
  distributions: iDistribution[] = [];
  isAdmin: boolean = false;
  selectedEnvironment: string = 'GNOME'; // Default desktop environment
  environmentDescription: string = '';

  environmentDescriptions: { [key: string]: string } = {
    'GNOME': 'Gnome is a desktop environment that is composed entirely of free and open-source software, targeting primarily Linux systems.',
    'KDE': 'KDE Plasma is a powerful open-source graphical desktop environment for Unix workstations.',
    'XFCE': 'XFCE is a lightweight desktop environment for UNIX-like operating systems.',
    'LXDE': 'LXDE is a free desktop environment with comparatively low resource requirements.',
    'CINNAMON': 'CINNAMON is a desktop environment which provides advanced innovative features and a traditional user experience.',
    'MATE': 'MATE is a desktop environment that continues the legacy of GNOME 2.'
    // Add more desktop environments and their descriptions as needed
  };

  constructor(private distributionService: DistributionService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe({
      next: isAdmin => {
        this.isAdmin = isAdmin;
      }
    });
    this.fetchDistributions(this.selectedEnvironment);
  }

  fetchDistributions(desktopEnvironment: string): void {
    this.environmentDescription = this.environmentDescriptions[desktopEnvironment] || 'Description not available.';
    this.distributionService.getDistributionsByDesktopEnvironment(desktopEnvironment).subscribe({
      next: (data: iDistribution[]) => {
        this.distributions = data;
      },
      error: (error: any) => {
        console.error('Error fetching distributions', error);
      }
    });
  }

  onEnvironmentChange(event: any): void {
    this.selectedEnvironment = event.target.value;
    this.fetchDistributions(this.selectedEnvironment);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/distributionDetails', id]);
  }

  deleteDistribution(id: number): void {
    this.distributionService.deleteDistribution(id).subscribe({
      next: () => {
        this.distributions = this.distributions.filter(distro => distro.id !== id);
      },
      error: (error: any) => {
        console.error('Error deleting distribution', error);
      }
    });
  }
}
