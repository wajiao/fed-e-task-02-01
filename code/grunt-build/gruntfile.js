const sass = require('sass')

const loadGruntTasks = require('load-grunt-tasks')
module.exports = grunt =>{
    grunt.initConfig({
        sass:{ 
            options:{
                sourceMap:true,
                implementation:sass
            },
            main:{//
                files:{
                    'dist/assets/styles/mian.css':'src/assets/styles/mian.scss'
                }
            }
        },
        babel:{
            options:{
                sourceMap:true,
                presets:['@babel/preset-env'] 
            },
            main:{ //babel/@babel/core/@babel/preset-env
                files:{
                    'dist/assets/scripts/main.js':'src/assets/scripts/main.js'
                }
            }
        },
        watch:{ 
            js:{
                files:['src/assets/scripts/*.js'],
                tasks:['babel']
            },
            css:{
                files:['src/assets/style/*.scss'],
                tasks:['sass']
            },

        }
    })
    // grunt.loadNpmTasks('grunt-sass')
    loadGruntTasks(grunt)
    
    grunt.registerTask('default',['sass','babel','watch'])
}
