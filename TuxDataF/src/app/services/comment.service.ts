import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iComment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/comments';

  constructor(private http: HttpClient) {}

  addComment(comment: iComment): Observable<iComment> {
    return this.http.post<iComment>(`${this.apiUrl}`, comment);
  }

  getCommentsByDistributionId(distributionId: number): Observable<iComment[]> {
    return this.http.get<iComment[]>(`${this.apiUrl}/distribution/${distributionId}`);
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }
}
