import { Pet } from './../pet';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../clientes';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { User } from '../user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-clientes-add',
  templateUrl: './clientes-add.component.html',
  styleUrls: ['./clientes-add.component.css'],
  animations: [
    trigger('horizontalStepTransition', [
      state('done', style({ /* estilos para a transição concluída */ })),
      // outras definições de estado e transição
    ])
  ]
})

export class ClientesAddComponent implements OnInit {
  petForm: FormGroup;
  clienteForm: FormGroup;
  isLinear = false;


  constructor(
    private router: Router,
    private service: ClientesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClientesAddComponent>
  ) {
    this.petForm = this.formBuilder.group({
      nomePet: ['', Validators.required],
      idade: ['', Validators.required],
      peso: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required]
    });

    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf:  ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cidade: ['', Validators.required],
      cep: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    if (this.petForm.valid && this.clienteForm.valid) {
      const petFormData = this.petForm.value;
      const clienteFormData = this.clienteForm.value;

      // let pet: Pet = new Pet();
      // pet.nome = petFormData.nomePet;
      // pet.idade = petFormData.idade;
      // pet.peso = petFormData.peso;
      // pet.especie = petFormData.especie;
      // pet.raca = petFormData.raca;

      // const cliente: Cliente = {
      //   id: 0,
      //   nome: clienteFormData.nome,
      //   email: clienteFormData.email,
      //   telefone: clienteFormData.telefone,
      //   cidade: clienteFormData.cidade,
      //   cep: clienteFormData.cep,
      //   cpf: '000000000000',
      //   pet: pet
      // };
      let user: User = {
        id: 0,
        name: clienteFormData.nome,
        email: clienteFormData.email,
        telefone: clienteFormData.telefone,
        cidade: clienteFormData.cidade,
        cep: clienteFormData.cep,
        cpf: clienteFormData.cpf,
        pet_name : petFormData.nomePet,
        pet_idade : petFormData.idade,
        pet_peso : petFormData.peso,
        pet_especie : petFormData.especie,
        pet_raca : petFormData.raca,

      };

      this.service.salvar(user).subscribe(response => {
        console.log(response);
      });

      this.dialogRef.close();
    }
  }
}

