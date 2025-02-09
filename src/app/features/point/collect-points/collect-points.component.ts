import { Component } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { CollectService } from '../../../core/services/collect.service';

@Component({
  selector: 'app-collect-points',
  templateUrl: './collect-points.component.html',
  styleUrls: ['./collect-points.component.css']
})
export class CollectPointsComponent {
  currentUser: User = {
    id: 0,
    fullName: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    birthDate: new Date(),
    city: "",
    role: "particulier",
    points: 0,
  }

  voucherAmount: number | null = null

  constructor(private collectService: CollectService) {}

  ngOnInit(): void {
    this.loadCurrentUser()
    this.loadVoucherAmount()
  }

  private loadCurrentUser(): void {
    const userString = localStorage.getItem("currentUser")
    if (userString) {
      this.currentUser = JSON.parse(userString)
      console.log("Utilisateur connecté:", this.currentUser)
    }
  }

  private loadVoucherAmount(): void {
    const voucherString = localStorage.getItem("voucherAmount")
    if (voucherString) {
      this.voucherAmount = JSON.parse(voucherString)
    }
  }

  convertPoints(userId: number, points: number): void {
    this.collectService.convertPointsToVoucher(userId, points).subscribe(
      ({ user, voucherAmount }) => {
        alert(`Vous avez obtenu un bon d'achat de ${voucherAmount} Dh.`)
        this.voucherAmount = voucherAmount
        this.currentUser = user
        localStorage.setItem("currentUser", JSON.stringify(user))
        localStorage.setItem("voucherAmount", JSON.stringify(voucherAmount))
        this.loadCurrentUser()
      },
      (error) => {
        alert(error.message)
      },
    )
  }

  clearVoucher(): void {
    this.voucherAmount = null
    localStorage.removeItem("voucherAmount")
  }
}

