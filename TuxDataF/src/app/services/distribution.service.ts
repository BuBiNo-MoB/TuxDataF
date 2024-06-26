import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { iDistribution } from '../models/distribution';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {


  productUrl = environment.distroUrl

  distributionArr: iDistribution[] = []

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<iDistribution[]>(this.productUrl)
  }

  createProduct(productArr:Partial<iDistribution>){
    return this.http.post<iDistribution>(this.productUrl, productArr)
  }


  getProductById(id: number): Observable<iDistribution> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<iDistribution>(url);
  }

  deleteProduct(id: number){
    return this.http.delete(this.productUrl+'/'+id)
  }

  editProduct(product: iDistribution){
          return this.http.patch<iDistribution>(this.productUrl+'/'+product.id, product)
    }
}
