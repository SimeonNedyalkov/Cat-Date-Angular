import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cat-Date';
  showLoader: boolean = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.showLoader = false;
    }, 1000); 
  }
}
