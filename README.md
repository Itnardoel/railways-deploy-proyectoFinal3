# Tercera Entrega Proyecto Final
Este es un servicio backend que permite el **manejo de productos y de carritos**. Este servicio permite `crear`, `obtener`, `actualizar` y `eliminar` **productos y carritos**. Ideal para un **ecommerce**.

## Configuración
Primero debemos crear un archivo en la raíz proyecto con el nombre `.env` con el siguiente contenido:
```
NODE_PORT=8080
NODE_ENV=local
TIPO_PERSISTENCIA=""
```
Acá estamos configurando una variable de entorno para nuestro proyecto las cuales se especifican a continuación:
| VARIABLE | VALOR DEFAULT | DESCRIPCIÓN |
| ------ | ------ | ------ |
| `NODE_PORT` | `8080` | Puerto por donde escuchará nuestro servicio. |
| `NODE_ENV` | `local` | Entorno en el cual se ejecuta. |
| `TIPO_PERSISTENCIA` | `` | Persistencia en memoria. |
|  | `json` | Persistencia en archivo. |
|  | `mongodb` | Persistencia en memoria. |
|  | `firebase` | Persistencia en firebase. |

## Ejecutar en producción
```sh
npm start
```

## Ejecutar en desarrollo
```sh
npm run dev
```

## Aclaraciones sobre la aplicacion
Tanto en el archivo `script.js` como en `productos.js`, van a encontrar una variable booleana **administrador** (lineas 21 y 6 respectivamente). Ambas se puede cambiar a false o dejarla en true y ver como cambia el funcionamiento de la aplicacion.