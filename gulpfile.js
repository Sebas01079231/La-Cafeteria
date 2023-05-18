/*  GULP-BASICOS
    
    require() -> 
        se utiliza para cargar los módulos de Gulp necesarios en un archivo de configuración de Gulp.
   
    src() ->  
        es un método que se utiliza para especificar una o varias rutas de origen (source) de los archivos que deseas procesar con Gulp.
    
    dest() -> 
        es un método que se utiliza para especificar la ruta de destino (destination) de los archivos procesados por Gulp.

    watch() ->  
        es un método que se utiliza para observar (watch) los cambios en uno o varios archivos y ejecutar automáticamente una o varias tareas de Gulp cuando se detecta un cambio. por ejemplo una tarea muy comun es el autoguardado, es decir que cuando cambiemos un estilo dentro de scss se vean esos cambios en la pagina, sin watch tendriamos que ejecutar en la terminal denuevo la tarea de ident,comp,guard para tranformar eso en css, pero eso se puede automatizar usando watch:
        
            watch('valor1', valor2);
        
        donde: 
        valor1: el archivo que se va observar, es decir que esta atento si hay algun cambio
        valor2: lo que va a ejecutar automaticamente si es que el valor1 ha cambiado.
    
    done() ->  
        función que se utiliza para indicar cuándo ha finalizado una tarea 
    
    .pipe() ->  
        ste método se utiliza para enviar los resultados de una tarea a la siguiente tarea en la tubería para su posterior procesamiento. como una lista de tareas o pasos a seguir
    
    exports ->  
        se utiliza en Node.js para definir los objetos que se pueden importar y utilizar en otros archivos.
    
    autoprefixer ->  
        se utiliza para agregar automáticamente prefijos de proveedores a las reglas CSS. Los prefijos de proveedores son una serie de prefijos que se agregan al comienzo de las propiedades CSS para garantizar que funcionen en diferentes navegadores web.
    
    PostCSS ->
        Es una herramienta de procesamiento de CSS que permite a los desarrolladores escribir CSS moderno utilizando sintaxis avanzadas y transformar el CSS existente para que sea compatible con navegadores más antiguos.

    browserslist -> 
        es una herramienta que se utiliza para configurar qué navegadores deben ser compatibles con un proyecto en particular. En Gulp, Browserslist se utiliza junto con otros complementos de PostCSS, como Autoprefixer, para generar código CSS compatible con navegadores específicos.Para utilizar Browserslist en Gulp, se debe instalar el paquete browserslist en el proyecto aunque también se puede configurar en el archivo package.json del proyecto.

    default ->
        es el nombre de la tarea predeterminada que se ejecuta cuando se invoca Gulp sin especificar una tarea específica. Es decir, si ejecutas el comando "gulp" en la terminal sin especificar una tarea, Gulp buscará una tarea llamada "default" y la ejecutará automáticamente.

        Tambien se utilizan para ejecutar multiples tareas usando las funciones series y parallel, que se esciben en el objeto gulp. 

            exports.default = parallel(css, dev);
            exports.default = series(css, dev);
        
        series: Se inicia una tarea, y hasta que finaliza, inicia la siguiente. (recomendable)
        
        parallel: Todas inician al mismo tiempo
    
    Comodin en Watch ->
        me permite ejecutar todos los archivos en una carpeta que terminen con una extension especifica. usando este comodin se puede ejecutar todos los .scss que tengas en una carpeta, y borrar el watch de style.scss que solo ejecuta ese.

    aligerar imagenes ->
        declarar imagemin como objeto y extraerlo de gulp-imagemin

        se requiere declarar la funcion antes de guardarlo, al definir la tarea de imagenes, el orden es importante en gulp.


    sourcemaps ->
        se utiliza para generar y manejar mapas de origen (sourcemaps) para archivos CSS y JavaScript.

        Los mapas de origen son archivos que contienen información sobre cómo se relacionan las líneas de código en un archivo minificado con las líneas de código en el archivo fuente original. Estos mapas permiten a los desarrolladores depurar y optimizar su código minificado de manera más eficiente, ya que pueden ver exactamente qué líneas de código corresponden a qué partes del código fuente original.

        esto se ve en los elementos del devtools

            1. instalar la dependencia: 
                npm i --save-dev gulp-sourcemaps

            2. añadirlo en gulpfile:
                const sourcemaps = require('gulp-sourcemaps');

            3. añadirlo en la tarea de compilacion:

                3.1 justo despues de identificar el archivo
                    .pipe(sourcemaps.init() )

                3.2 despues de postcss-autoprefixer
                    .pipe(sourcemaps.write('.'))

    cssnano ->

            1. instalar la dependencia: 
                npm i --save-dev cssnano

            2. añadirlo en gulpfile:
                const cssnano = require('cssnano');

            3. añadirlo en la tarea de compilacion:

                3.1 Dentro de el arreglo de postcss junto con autoprefixer
                        .pipe(postcss([autoprefixer(), cssnano()]))





*/
const {src, dest, watch, series, parallel} = require('gulp');

//css y sass
const sass = require('gulp-sass') (require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif  = require('gulp-avif');

function css(done) {
    //identificar archivo, compilar, guardar
    src('src/sass/style.scss')
        .pipe(sourcemaps.init() )
        .pipe(sass(/*{outputStyle: 'compressed'}*/))
        .pipe(postcss([autoprefixer()/*, cssnano()*/]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));
    done();
};



// img compilacion
function imagenes() {
    // identificar archivos, optimizar, guardar
    return src('src/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3}) )
        .pipe(dest('build/img'));
};
function versionWebp() {
    const opciones = {
        quality: 50
    };

    return src('src/img/**/*.{png,jpg}') //selecciona todas las imagenes, pero filtra solo las que necesito (png,jpg)
        .pipe(webp( opciones)) //compila en formato webp
        .pipe(dest('build/img')); //guardar
};
function versionAvif() {
    const opciones = {
        quality: 50
    };
    return src('src/img/**/*.{png,jpg}') //identificar 
        .pipe(avif(opciones)) //compilar
        .pipe(dest('build/img')); //guardar 
}



// watch's
function dev() {
    watch('src/sass/**/*.scss', css); //comodin
    // watch('src/sass/style.scss', css);

    watch('src/img/**/*',  imagenes);
    watch('src/img/**/*.{png,jpg}', versionWebp);
    watch('src/img/**/*.{png,jpg}', versionAvif);
}; 



// exports 
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes,versionWebp, versionAvif, css, dev);