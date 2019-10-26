import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Location } from '@angular/common'
import { from } from 'rxjs';
import { NetworkServiceService } from 'src/app/services/network-service.service';
@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  mProduct: Product = new Product();
  imageSrc: ArrayBuffer | string = null;

  constructor(private location: Location,
    private networkService: NetworkServiceService) {
      
    }

  ngOnInit() {
  }

  onSubmit(){
    this.networkService.addProduct(this.mProduct).subscribe(
      result => {
          this.location.back()
      }
    );
  }

  onUploadImage(event) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onload = () => {
        this.imageSrc = reader.result;
        this.mProduct.image = metaImage
      };
    }
  }

  onCancel(){
    this.location.back();
  }

}
