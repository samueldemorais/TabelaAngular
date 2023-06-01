import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../shared/modelo/usuario';
import {UsuarioService} from '../../shared/services/usuario.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-listagem-tabela',
  templateUrl: './listagem-tabela.component.html',
  styleUrls: ['./listagem-tabela.component.css']
})


export class ListagemTabelaComponent implements OnInit{
  usuarios!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ["id","name", "cpf", "ações"]
  

  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      (usuarios: Usuario[]) => this.usuarios = new MatTableDataSource<Usuario>(usuarios)
    );
  }

  apagar(id:number): void{
    this.usuarioService.apagar(id).subscribe(
        apagado => {
        const index = this.usuarios.data.findIndex(usuario => usuario.id === id);
        if (index > -1){
          this.usuarios.data.splice(index,1);
          this.usuarios = new MatTableDataSource(this.usuarios.data);
        }
      }
    )
  }

}
