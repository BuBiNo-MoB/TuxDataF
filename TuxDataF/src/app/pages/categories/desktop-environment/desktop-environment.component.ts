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
    'GNOME': 'Gnome is a desktop environment that is composed entirely of free and open-source software, targeting primarily Linux systems. It offers a clean and user-friendly interface, focusing on simplicity and ease of use. GNOME is known for its high level of integration with the GNOME software suite, providing a cohesive and polished user experience.',
    'KDE': 'KDE Plasma is a powerful open-source graphical desktop environment for Unix workstations. It is highly customizable and offers a wide range of features, making it suitable for both beginners and advanced users. KDE Plasma emphasizes a modern and visually appealing interface, combined with strong performance and flexibility.',
    'XFCE': 'XFCE is a lightweight desktop environment for UNIX-like operating systems. Designed to be fast and low on system resources, it provides a classic desktop experience. XFCE is highly configurable and aims to be user-friendly while maintaining a balance between performance and functionality.',
    'LXDE': 'LXDE is a free desktop environment with comparatively low resource requirements. It is designed to be lightweight and fast, making it an excellent choice for older hardware and systems with limited resources. LXDE offers a simple and clean user interface, focusing on speed and efficiency.',
    'CINNAMON': 'Cinnamon is a desktop environment that provides advanced innovative features and a traditional user experience. It is built on the foundation of GNOME 3, but with a more familiar and intuitive layout. Cinnamon is known for its ease of use, elegance, and a range of customization options, making it popular among both new and experienced users.',
    'MATE': 'MATE is a desktop environment that continues the legacy of GNOME 2. It offers a classic desktop experience with a focus on stability and performance. MATE is designed to be familiar to users of GNOME 2, providing a traditional and straightforward user interface while incorporating modern features and improvements.'
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

  toggleLike(distro: iDistribution): void {
    if (distro.isLiked) {
      this.distributionService.removeLike(distro.id).subscribe({
        next: () => {
          distro.isLiked = false;
          distro.likes--;
        },
        error: (error: any) => {
          console.error('Error removing like', error);
        }
      });
    } else {
      this.distributionService.addLike(distro.id).subscribe({
        next: () => {
          distro.isLiked = true;
          distro.likes++;
        },
        error: (error: any) => {
          console.error('Error adding like', error);
        }
      });
    }
  }
}
