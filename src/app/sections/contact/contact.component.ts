import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const url = 'https://example.com/api/contact'; // Remplacez par l'URL de votre API
      this.http.post(url, this.contactForm.value).subscribe({
        next: (response) => {
          alert('Message envoyé avec succès !');
          this.contactForm.reset(); // Réinitialise le formulaire
        },
        error: (err) => {
          alert('Une erreur est survenue. Veuillez réessayer.');
          console.error(err);
        }
      });
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }
}
