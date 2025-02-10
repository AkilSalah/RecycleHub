import { Component } from '@angular/core';
import { CollectRequest } from '../../../core/models/collect-request.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  collectRequests: CollectRequest[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.collectRequests = this.route.snapshot.data['collectRequests'];
    console.log('Demandes de collecte préchargées :', this.collectRequests);
  }
}
