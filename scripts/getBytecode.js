const fs = require('fs');
const path = require('path');

async function main() {
  // artifacts 디렉토리에서 컴파일된 컨트랙트 파일 읽기
  const artifactPath = path.join(__dirname, '../artifacts/contracts/KaiaToken.sol/KaiaToken.json');
  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

  // 바이트코드 추출
  const bytecode = artifact.bytecode;
  
  console.log('Contract Bytecode:');
  console.log(bytecode);
  
  // 바이트코드를 파일로 저장
  fs.writeFileSync(
    path.join(__dirname, '../src/contractBytecode.js'),
    `export const contractBytecode = '${bytecode}';`
  );
  
  console.log('\nBytecode has been saved to src/contractBytecode.js');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 