import { Pet } from '../pet';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from 'src/app/clientes.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-add',
  templateUrl: './clientes-add.component.html',
  styleUrls: ['./clientes-add.component.css']
})
export class ClientesAddComponent implements OnInit {
  petForm: FormGroup;
  clienteForm: FormGroup;
  isLinear = true;
  racasCachorros!: string[];
  racasGatos!: string[];




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
      especie: [''],
      raca: [''],
      sexo: ['', Validators.required]
    });


    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf:  ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cidade: ['', Validators.required],
      cep: ['', Validators.required],
      numero: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    this.service.getRacas().subscribe((racas: any) => {
      this.racasCachorros = racas.cao;
      this.racasGatos = racas.gato;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    if (this.petForm.valid && this.clienteForm.valid) {
      const petFormData = this.petForm.value;
      const clienteFormData = this.clienteForm.value;

      const pet: Pet = {
        id: 0,
        nome: petFormData.nomePet,
        idade: petFormData.idade,
        peso: petFormData.peso,
        especie: petFormData.especie,
        raca: petFormData.raca,
        sexo:petFormData.sexo
      };

      const cliente: User = {
        id: 0,
        nome: clienteFormData.nome,
        email: clienteFormData.email,
        telefone: clienteFormData.telefone,
        cidade: clienteFormData.cidade,
        cep: clienteFormData.cep,
        cpf: clienteFormData.cpf,
        casa: clienteFormData.numero,
        pet: pet
      };

      this.service.salvar(cliente).subscribe(response => {
        console.log(response);
        this.dialogRef.close({ clienteCadastrado: true }); // Emitir evento
      });
      this.dialogRef.close();
    }
  }
}

