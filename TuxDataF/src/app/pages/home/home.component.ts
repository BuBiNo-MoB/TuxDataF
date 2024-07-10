import { Component, OnInit, ViewChild } from '@angular/core';
import { DistributionService } from '../../services/distribution.service';
import { iDistribution } from '../../models/distribution';
import { AuthService } from '../../pages/auth/auth.service';
import { Router } from '@angular/router';
import { iUser } from '../../models/user';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  distributions: iDistribution[] = [];
  isAdmin: boolean = false;
  visibleDistributions: iDistribution[] = [];
  isUserLoggedIn: boolean = false;
  currentUser: iUser | null = null;
  users: iUser[] = [];

  paused = false;
	unpauseOnArrow = false;
	pauseOnIndicator = false;
	pauseOnHover = true;
	pauseOnFocus = true;

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  constructor(private distributionService: DistributionService, private authService: AuthService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchDistributions(); // Call the fetchDistributions method to populate the distributions
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authService.isLoggedIn$.subscribe((data) => {
      this.isUserLoggedIn = data;
    });
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: iUser[]) => {
        this.users = data;
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      },
    });
  }

  fetchDistributions(): void {
    this.distributionService.getAll().subscribe({
      next: (data: iDistribution[]) => {
        this.distributions = data;
        this.visibleDistributions = this.distributions.slice(-2);
      },
      error: (error:any) => {
        console.error('Error fetching distributions', error);
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/distributionDetails', id]);
  }

  deleteDistribution(id: number): void {
    this.distributionService.deleteDistribution(id).subscribe({
      next: () => {
        this.distributions = this.distributions.filter(distro => distro.id !== id);
        this.visibleDistributions = this.distributions.slice(0, 4); // Aggiorna le distribuzioni visibili
      },
      error: (error:any) => {
        console.error('Error deleting distribution', error);
      }
    });
  }

  togglePaused() {
		if (this.paused) {
			this.carousel.cycle();
		} else {
			this.carousel.pause();
		}
		this.paused = !this.paused;
	}

	onSlide(slideEvent: NgbSlideEvent) {
		if (
			this.unpauseOnArrow &&
			slideEvent.paused &&
			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
		) {
			this.togglePaused();
		}
		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
			this.togglePaused();
		}
	}
}
