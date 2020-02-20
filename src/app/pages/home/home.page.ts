import { Component, OnInit } from '@angular/core';
import { MundusApiService } from '../../services/mundus-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public productos: Array<any>;

  constructor(private mundusApiService: MundusApiService) { }

  ngOnInit() {
    //this.loadProducts();
  }

  public loadProducts() {
    this.mundusApiService.getProductos(50, 0).subscribe(response => {
      console.log(response); 
      this.productos = response.data;
    });
  }

  

}
