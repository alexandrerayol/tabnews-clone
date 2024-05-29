const {exec} = require("node:child_process")

function checkPostgres(){
    exec('docker exec postgres_dev pg_isready --host localhost', handleReturn)

    function handleReturn(error, stdout){
        if(stdout.search('accepting connections') === -1){
            process.stdout.write('.')
            checkPostgres()
            return;
        }
        
        console.log('\n🟢 O postgres está aceitando conexões')
    }
}

process.stdout.write('\n🟡 Aguardando o postgres aceitar conexões')
checkPostgres()