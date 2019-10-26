import { Component, OnInit } from '@angular/core';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { TestJSON } from 'src/app/models/test.model';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit {

  mDataArray: Product[];
  mSearchArray: Product[];

  searchTextChanged = new Subject<string>();

  constructor(private networkService: NetworkServiceService, private router: Router ) { }

  ngOnInit() {
    this.feedData()

    this.searchTextChanged.pipe(
      debounceTime(2000)
    ).subscribe(
      term => this.searchProduct(term)
    )
  }

  searchProduct(term: String){
    console.log(term)
    if(term === ''){
      this.feedData()
    }else{
      this.mDataArray = this.mSearchArray.filter(
        (product) => {
          return product.name.toLowerCase().indexOf(term.toLowerCase()) > -1
        }
      );
    }
  }

  feedData() {
    this.networkService.getProductAll().subscribe(
      data => {
        this.mDataArray = data.result;
        this.mSearchArray = data.result;
      }
    )
  }

  getOutOfStock(): number {
    return this.mDataArray.filter(
      (product) => {
        return product.stock == 0
      }
    ).length;
  }

  deleteProduct(id: number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async result => {
        this.networkService.deleteProduct(id).subscribe(
          result => {
              this.feedData()
          },
          error => {
            //todo
          }
        );
    });
  }

  editProduct(id: number){
      this.router.navigate([`stock/edit/${id}`]);
  }

}
