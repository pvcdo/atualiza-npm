import fs from 'fs'
import path from "path"
import walker from "walker"
import { exec }from "child_process"
import { promisify } from 'util'

const initPath = 'D:/Paulo Victor/Estudos/Programação/estudos-nodejs'

async function andarilho(){
  let pastas = []
  await andar(pastas)
  return pastas
}

async function andar(pastas){
  walker(initPath).on('dir', function(dir, stat) {
    const arr_dir = dir.split('\\') 
    if(arr_dir.includes('node_modules')){
      
      let vai = true
      let arr_dir_node = []
      let pasta = ''
      
      arr_dir.forEach((thePath, i)=>{
        if(thePath === 'node_modules'){
          vai = false
        }
        if(vai){
          if(i > 4){
            pasta += '/' + thePath
          }
          arr_dir_node.push(thePath)
        }
      })

      const pastaPath = path.join(...arr_dir_node)
      if(!pastas.includes(pastaPath)){
        pastas.push(pastaPath)
      }
    }
  })
  
}

console.log(andarilho())

    /* const packageJsonPath = `${pastaPath}\\package.json`
        if(fs.existsSync(packageJsonPath)){
          
          
          /*const packageJsonBuffer = fs.readFileSync(packageJsonPath)
          const packageJson = JSON.parse(packageJsonBuffer)
          
          const shell1 = `cd ${pastaPath}`
          const shell2 = 'npm-upgrade';

          exec(`${shell1}\n${shell2}`,(error,stdout,stderr) => {
            console.log(pasta)
            if (error) {
              console.log(`ERROOOOOOOOOO: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`STDERRRRRRRR: ${stderr}`);
              return;
            }
            console.log(`${stdout}`);
          })
        } */


