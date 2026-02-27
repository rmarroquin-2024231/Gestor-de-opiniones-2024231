# Gestor de opiniones

## Laboratorio 2

## Explicación del como funciona

El auth funciona como el login donde podemos registrarnos como usuario.
Cuando nos registramos o iniciamos sesión, se genera un token que es lo que da el nivel de acceso.
Igual en el auth podemos hacer el login con algún usuario que hayamos creado antes y se puede verificar el correo.
En el token que genera nos da su role, su id de usuario, quién lo envía, a quién se dirige y su tiempo de expiración.

El publication funciona para crear, editar, eliminar y ver publicaciones.
Para poder hacer acciones como crear, editar o eliminar, necesitamos enviar el token que nos dio el auth, porque ese token es el que verifica qué usuario somos y qué nivel de acceso tenemos.
Cuando se envía el token, el sistema verifica el role y el id del usuario.
Si es el creador de la publicación o es admin, puede modificarla o eliminarla.
Si no, no se puede.

El comments funciona para crear, editar, eliminar y ver comentarios dentro de una publicación.
También necesita el token que genera el auth para saber qué usuario está haciendo la acción.
Cuando se intenta editar o eliminar un comentario, se verifica el id del usuario que viene en el token.
Si es el autor o tiene role de admin, puede hacerlo.
Si no, no tiene permiso.

## Ajuste del backlog

Se ajustó el Sprint 2, el cual se terminó antes de lo previsto, y se trabajó Comment.
El Sprint 1 también se ajustó en el que se finalizo Publication. 