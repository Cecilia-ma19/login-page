import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-animal-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animal-signup.component.html',
  styleUrls: ['./animal-signup.component.scss']
})
export class AnimalSignupComponent {
  animal = {
    nome: '',
    especie: '',
    raca: '',
    sexo: '',
    tamanho: '',
    cor: '',
    idade: null,
    descricao: ''
  };

  showRacas = false;

  constructor(private animalService: AnimalService) {}

  onSubmit(): void {
    if (!this.animal.nome || !this.animal.especie || !this.animal.sexo || !this.animal.tamanho || !this.animal.cor || !this.animal.idade || !this.animal.descricao) {
      console.warn('Formulário inválido!');
      return;
    }

    const formData = new FormData();
    formData.append('userId', '0c080a7f-e74d-4d24-9c84-d36f751f968d');
    formData.append('nome', this.animal.nome);
    formData.append('especie', this.animal.especie);
    formData.append('raca', this.animal.raca || '');
    formData.append('sexo', this.animal.sexo);
    formData.append('tamanho', this.animal.tamanho);
    formData.append('cor', this.animal.cor);
    formData.append('idade', String(this.animal.idade));
    formData.append('descricao', this.animal.descricao);

    this.animalService.cadastrarAnimal(formData).subscribe({
      next: (res) => {
        console.log('Animal cadastrado com sucesso:', res);
        this.animal = {
          nome: '', especie: '', raca: '', sexo: '', tamanho: '',
          cor: '', idade: null, descricao: ''
        };
      },
      error: (err) => {
        console.error('Erro ao cadastrar animal:', err);
      }
    });
  }

  onSpeciesChange(): void {
    this.showRacas = this.animal.especie === 'CACHORRO';
  }
}
