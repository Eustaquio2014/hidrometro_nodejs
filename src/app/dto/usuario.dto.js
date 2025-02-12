module.exports.UsuarioRawDTO = class UsuarioRawDTO {
  id
  nome
  sobrenome
  email
  createdAt
  updatedAt
  constructor(usuario) {
      this.id = usuario?.id;
      this.nome = usuario?.nome;
      this.sobrenome = usuario?.sobrenome
      this.email = usuario?.email
  }
}


module.exports.UsuarioDTO = class UsuarioDTO {
  id
  nome
  sobrenome
  email
  constructor(usuario) {
      this.id = usuario?.id;
      this.nome = usuario?.nome;
      this.sobrenome = usuario?.sobrenome;
      this.email = usuario?.email;
  }
}


module.exports.UsuarioSessionDTO = class UsuarioSessionDTO {
  id
  nome
  sobrenome
  email
  dispositivos
  constructor(usuario) {
      this.id = usuario?.id;
      this.nome = usuario?.nome;
      this.sobrenome = usuario?.sobrenome;
      this.email = usuario?.email;
      this.dispositivos= usuario?.dispositivos
  }
}
