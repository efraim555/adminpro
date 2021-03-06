import {Injectable} from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient,
              public router: Router) {
    this.cargarStorage();
    console.log('Servicio listo');
  }

  logeado() {
    return (this.token.length > 5);
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
      .pipe(
        map((res: any) => {
          this.guardarStorage(res.id, res.token, res.usuario);
          return true;
        })
      );
  }

  loginGoogle(token: string) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token})
      .pipe(
        map((res: any) => {
          this.guardarStorage(res.id, res.token, res.usuario);
          return true;
        })
      );
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .pipe(
        map((res: any) => {
          swal('Usuario creado', usuario.email, 'success');
          return res.usuario;
        })
      );
  }
}
