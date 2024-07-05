import { ActivatedRoute, Router } from '@angular/router';
import { DistributionService } from './../../services/distribution.service';
import { Component, OnInit } from '@angular/core';
import { iDistribution } from '../../models/distribution';
import { AuthService } from '../auth/auth.service';
import { CommentService } from '../../services/comment.service';
import { iComment } from '../../models/comment';
import { iUser } from '../../models/user';

@Component({
  selector: 'app-distribution-details',
  templateUrl: './distribution-details.component.html',
  styleUrls: ['./distribution-details.component.scss']
})
export class DistributionDetailsComponent implements OnInit {
  distributionId!: number;
  distributionArr: iDistribution[] = [];
  isAdmin: boolean = false;
  comments: iComment[] = [];
  newCommentText: string = '';
  currentUser: iUser | null = null;

  constructor(
    private route: ActivatedRoute,
    private distributionService: DistributionService,
    private router: Router,
    private authService: AuthService,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: { [key: string]: any }) => {
        this.distributionId = +params['id'];
        this.loadDistributionDetails();
        this.loadComments();
      }
    });

    this.authService.isAdmin$.subscribe({
      next: isAdmin => {
        this.isAdmin = isAdmin;
      }
    });

    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  loadDistributionDetails() {
    this.distributionService.getDistributionById(this.distributionId).subscribe({
      next: (product: iDistribution) => {
        this.distributionArr = [product];
      },
      error: (error) => {
        console.error('Error loading distribution details', error);
      }
    });
  }

  loadDistributionDetailsByKeyword(keyword: string) {
    this.distributionService.searchDistributions(keyword).subscribe(
      (products: iDistribution[]) => {
        this.distributionArr = products;
      },
      (error) => {
        console.error('Error loading distribution details', error);
      }
    );
  }

  deleteDistribution(id: number): void {
    this.distributionService.deleteDistribution(id).subscribe({
      next: () => {
        this.distributionArr = this.distributionArr.filter(distro => distro.id !== id);
      },
      error: (error) => {
        console.error('Error deleting distribution', error);
      }
    });
  }

  loadComments() {
    this.commentService.getCommentsByDistributionId(this.distributionId).subscribe({
      next: (comments: iComment[]) => {
        this.comments = comments;
      },
      error: (error) => {
        console.error('Error loading comments', error);
      }
    });
  }

  addComment() {
    if (!this.newCommentText.trim()) {
      return;
    }

    const newComment: iComment = {
      id: 0, // Questo sarà generato dal backend
      text: this.newCommentText,
      username: this.currentUser ? this.currentUser.username : '', // Questo sarà impostato dal backend
      distributionId: this.distributionId,
      userId: this.currentUser ? this.currentUser.id : 0 // Assicurati che AuthService abbia questo metodo
    };

    this.commentService.addComment(newComment).subscribe({
      next: (comment: iComment) => {
        this.comments.push(comment);
        this.newCommentText = '';
      },
      error: (error) => {
        console.error('Error adding comment', error);
      }
    });
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      },
      error: (error) => {
        console.error('Error deleting comment', error);
      }
    });
  }
}
