import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaTelegramPlane, FaWallet } from 'react-icons/fa'
import { contractBytecode } from './contractBytecode'
import logoImg from './assets/ktc-logo.png'
import './App.css'
import Web3 from 'web3'

const PageWrap = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const CenterWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  min-width: 320px;
  background: #fff;
  border-radius: 36px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.10);
  padding: 64px 32px 64px 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  @media (max-width: 700px) {
    max-width: 100%;
    padding: 32px 16px;
    border-radius: 22px;
  }
`;

const TopBar = styled.div`
  position: absolute;
  top: 180px;
  right: 32px;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 10;
  @media (max-width: 700px) {
    top: 160px;
    right: 8px;
    gap: 8px;
  }
`;

const LogoFixed = styled.img`
  position: absolute;
  top: 24px;
  left: 32px;
  max-width: 270px;
  max-height: 270px;
  width: auto;
  height: auto;
  object-fit: contain;
  z-index: 11;
  @media (max-width: 700px) {
    top: 10px;
    left: 8px;
    max-width: 180px;
    max-height: 180px;
  }
`;

const TopLink = styled.a`
  font-size: 16px;
  color: #444;
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover { color: #7c3aed; }
`;

const IconLink = styled(TopLink)`
  font-size: 20px;
  padding: 0 2px;
  color: ${props => props.connected ? '#7c3aed' : '#444'};
  transition: color 0.2s ease;
  &:hover { 
    color: ${props => props.connected ? '#5b21b6' : '#7c3aed'}; 
  }
`;

const TitleSection = styled.div`
  margin-top: 260px;
  margin-bottom: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 700px) {
    margin-top: 220px;
  }
`;

const MainTitle = styled.h1`
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: -1.5px;
  color: #222;
  text-align: center;
  margin: 0 0 10px 0;
  line-height: 1.3;
  @media (min-width: 700px) {
    font-size: 2.1rem;
  }
`;

const Powered = styled.div`
  font-size: 1.02rem;
  color: #aaa;
  text-align: center;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 1.18rem;
  font-weight: 600;
  margin-bottom: 2px;
  @media (min-width: 700px) {
    font-size: 1.28rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 18px;
  border: 1.5px solid #e5e5e5;
  border-radius: 12px;
  font-size: 1.13rem;
  margin-bottom: 0;
  box-sizing: border-box;
  &:focus { border-color: #7c3aed; }
  @media (min-width: 700px) {
    font-size: 1.18rem;
    padding: 18px 22px;
  }
`;

const Desc = styled.div`
  font-size: 1.03rem;
  color: #888;
  margin-bottom: 0;
  @media (min-width: 700px) {
    font-size: 1.09rem;
  }
`;

const GuideWrap = styled.div`
  margin: 32px 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Guide = styled.div`
  font-size: 0.93rem;
  color: #666;
  line-height: 1.7;
  display: flex;
  align-items: flex-start;
  gap: 7px;
  text-align: left;
  @media (min-width: 700px) {
    font-size: 1.01rem;
  }
`;

const GuideIcon = styled.span`
  color: #7c3aed;
  font-size: 1.1em;
  margin-right: 2px;
`;

const Button = styled.button`
  margin-top: 28px;
  width: 100%;
  padding: 15px 0;
  font-size: 1.13rem;
  font-weight: 700;
  background: #7c3aed;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.18s;
  &:hover { background: #5b21b6; }
  @media (min-width: 700px) {
    font-size: 1.18rem;
    padding: 18px 0;
  }
`;

const ContractAddressBox = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
`

const ContractAddressTitle = styled.div`
  color: #222;
  font-size: 16px;
  font-weight: 600;
`

const ContractAddress = styled.div`
  color: #111;
  font-size: 15px;
  word-break: break-all;
  flex: 1;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
`

const CopyButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  align-self: flex-end;

  &:hover {
    background: #45a049;
  }
`

export default function App() {
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [networkVersion, setNetworkVersion] = useState('');
  const [createdContractAddress, setCreatedContractAddress] = useState('');

  useEffect(() => {
    // 페이지 로드 시 지갑 연결 상태 확인
    checkWalletConnection();
    
    // 네트워크 변경 감지
    if (window.klaytn) {
      window.klaytn.on('networkChanged', (networkId) => {
        setNetworkVersion(networkId);
      });
    }
  }, []);

  const checkWalletConnection = async () => {
    if (window.klaytn) {
      try {
        const accounts = await window.klaytn.request({ method: 'klay_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsWalletConnected(true);
          setNetworkVersion(window.klaytn.networkVersion);
        }
      } catch (error) {
        console.error('지갑 연결 상태 확인 중 오류 발생:', error);
      }
    }
  };

  const handleWalletConnect = async () => {
    try {
      // 모바일 환경 체크
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      console.log('Mobile check:', isMobile);

      if (isMobile) {
        console.log('Mobile wallet connection started');
        try {
          // Kaia Wallet API에서 request_key 발급 (공식 문서 방식)
          const res = await fetch('https://api.kaiawallet.io/v1/prepare', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              type: 'auth',
              chain: 'kaia',
              redirect: true,
              callback: window.location.href
            }),
          });

          const data = await res.json();
          if (!data.request_key) {
            alert('Kaia Wallet 연동용 request_key 발급에 실패했습니다.');
            return;
          }

          // 공식 딥링크 스킴
          const walletUrl = `kaiawallet://wallet/api?request_key=${data.request_key}`;
          window.location.href = walletUrl;

          // Result 단계: 폴링
          const checkRequestStatus = async () => {
            try {
              const statusRes = await fetch(`https://api.kaiawallet.io/v1/result?request_key=${data.request_key}`);
              const statusData = await statusRes.json();
              if (statusData.status === 'completed') {
                setAccount(statusData.address);
                setIsWalletConnected(true);
                return true;
              } else if (statusData.status === 'failed') {
                alert('지갑 연결에 실패했습니다.');
                return true;
              }
              return false;
            } catch (error) {
              return false;
            }
          };

          setTimeout(async () => {
            let isCompleted = false;
            let attempts = 0;
            const maxAttempts = 20;
            while (!isCompleted && attempts < maxAttempts) {
              isCompleted = await checkRequestStatus();
              if (!isCompleted) {
                await new Promise(resolve => setTimeout(resolve, 3000));
                attempts++;
              }
            }
            if (!isCompleted) {
              alert('지갑 연결 시간이 초과되었습니다. 다시 시도해주세요.');
            }
          }, 3000);

          return;
        } catch (apiError) {
          alert('Kaia Wallet API 요청에 실패했습니다. 다시 시도해주세요.');
          return;
        }
      }

      // PC 환경의 기존 로직 유지
      if (window.klaytn) {
        try {
          const accounts = await window.klaytn.enable();
          setAccount(accounts[0]);
          setIsWalletConnected(true);
        } catch (error) {
          console.error('Klaytn 연결 실패:', error);
        }
      } else {
        alert('Kaia Wallet을 설치해주세요.');
        window.open('https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi', '_blank');
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert('지갑 연결 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('컨트랙트 주소가 복사되었습니다!');
    } catch (err) {
      console.error('복사 실패:', err);
      alert('복사에 실패했습니다.');
    }
  };

  const onCreateToken = async () => {
    if (!isWalletConnected) {
      alert('먼저 지갑을 연결해주세요');
      return;
    }

    if (!tokenName || !tokenSymbol) {
      alert('토큰 이름과 심볼을 모두 입력해주세요');
      return;
    }

    try {
      setIsLoading(true);

      const DEVELOPER_WALLET = '0x89aeE78C7E068cD63E0Fd42D278Af146A9511aFc';
      const isDeveloper = account.toLowerCase() === DEVELOPER_WALLET.toLowerCase();

      // web3 인스턴스 생성
      const web3 = new Web3(window.klaytn);

      // 컨트랙트 ABI (constructor만 포함)
      const contractABI = [
        {
          "inputs": [
            { "name": "name", "type": "string" },
            { "name": "symbol", "type": "string" },
            { "name": "initialOwner", "type": "address" }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        }
      ];

      // 컨트랙트 인스턴스 생성
      const contract = new web3.eth.Contract(contractABI);
      const deployTx = contract.deploy({
        data: contractBytecode,
        arguments: [tokenName, tokenSymbol, isDeveloper ? DEVELOPER_WALLET : account]
      });

      // 가스 추정
      const gas = await deployTx.estimateGas({ from: account });

      // 컨트랙트 배포
      const newContractInstance = await deployTx.send({
        from: account,
        gas,
      });

      const contractAddress = newContractInstance.options.address;
      console.log('컨트랙트 배포 완료:', contractAddress);
      setCreatedContractAddress(contractAddress);

      if (!isDeveloper) {
        // 일반 사용자인 경우, 토큰 전송 트랜잭션 실행
        const tokenABI = [
          {
            "inputs": [
              { "name": "to", "type": "address" },
              { "name": "amount", "type": "uint256" }
            ],
            "name": "transfer",
            "outputs": [{ "name": "", "type": "bool" }],
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ];
        const tokenContract = new web3.eth.Contract(tokenABI, contractAddress);
        // 990,000,000개를 사용자에게 전송
        await tokenContract.methods.transfer(
          account,
          '990000000000000000000000000'
        ).send({
          from: account,
          gas: 100000,
        });
      }

      alert(`토큰이 성공적으로 생성되었습니다!\n컨트랙트 주소: ${contractAddress}`);
      // 입력 필드 초기화
      setTokenName('');
      setTokenSymbol('');
    } catch (error) {
      console.error('토큰 생성 중 오류 발생:', error);
      if (error.code === 4001) {
        alert('사용자가 트랜잭션을 취소했습니다.');
      } else if (error.code === -32603) {
        alert('트랜잭션 실행에 실패했습니다. 가스비를 확인해주세요.');
      } else {
        alert(`토큰 생성에 실패했습니다.\n에러: ${error.message || '알 수 없는 오류'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrap>
      <CenterWrap>
        <Container>
          <LogoFixed src={logoImg} alt="logo" />
          <TopBar>
            <TopLink href="https://kaia-token-creator.gitbook.io/kaia-token-creator/guide" target="_blank" rel="noopener noreferrer">가이드</TopLink>
            <TopLink href="https://kaia-token-creator.gitbook.io/kaia-token-creator" target="_blank" rel="noopener noreferrer">DOCS</TopLink>
            <IconLink href="https://t.me/officailKTC" target="_blank" rel="noopener noreferrer"><FaTelegramPlane size={20} /></IconLink>
            <IconLink 
              as="button" 
              onClick={handleWalletConnect} 
              title={isWalletConnected ? `연결됨: ${account.slice(0, 6)}...${account.slice(-4)} (클릭하여 연결 해제)` : "지갑 연결"}
              disabled={isLoading}
              connected={isWalletConnected}
            >
              <FaWallet size={20} />
            </IconLink>
            <TopLink href="https://kaia-token-creator.gitbook.io/kaia-token-creator/docs/link" target="_blank" rel="noopener noreferrer">Contact</TopLink>
          </TopBar>
          <TitleSection>
            <MainTitle>무료로 나만의 밈코인/팬토큰을 만들어 보세요</MainTitle>
            <Powered>powered on kaia</Powered>
          </TitleSection>
          <Form onSubmit={e => { e.preventDefault(); }}>
            <Field>
              <Label htmlFor="tokenName">토큰명</Label>
              <Input
                id="tokenName"
                placeholder="토큰명을 입력하세요"
                value={tokenName}
                onChange={e => setTokenName(e.target.value)}
                disabled={isLoading}
              />
              <Desc>토큰 이름을 입력하세요 (영문, ex - Kaia Token Creator)</Desc>
            </Field>
            <Field>
              <Label htmlFor="tokenSymbol">토큰 심볼</Label>
              <Input
                id="tokenSymbol"
                placeholder="토큰 심볼을 입력하세요"
                value={tokenSymbol}
                onChange={e => setTokenSymbol(e.target.value)}
                disabled={isLoading}
              />
              <Desc>토큰 심볼을 입력하세요(영문 대문자, ex - KTC)</Desc>
            </Field>
            <GuideWrap>
              <Guide><GuideIcon>•</GuideIcon>발행량은 10억개로 고정됩니다<br/>&nbsp;&nbsp;(1%는 KTC 팀에 자동 분배되고 9억9천만개가 발행자의 지갑에 생성됩니다. 이후 추가 발행 불가)</Guide>
              <Guide><GuideIcon>•</GuideIcon>토큰 소수점은 18자리로 고정됩니다</Guide>
            </GuideWrap>
            <Button
              type="button"
              onClick={() => {
                if (!isWalletConnected) {
                  alert('먼저 지갑을 연결해주세요');
                  return;
                }
                onCreateToken();
              }}
              disabled={isLoading}
            >
              {isLoading ? '처리중...' : '토큰 생성하기'}
            </Button>
          </Form>

          {createdContractAddress && (
            <ContractAddressBox>
              <ContractAddressTitle>
                생성이 완료되었습니다. 토큰 컨트랙트 주소는 아래와 같습니다:
              </ContractAddressTitle>
              <ContractAddress>
                {createdContractAddress}
              </ContractAddress>
              <CopyButton onClick={() => copyToClipboard(createdContractAddress)}>
                복사하기
              </CopyButton>
            </ContractAddressBox>
          )}
        </Container>
      </CenterWrap>
    </PageWrap>
  );
}
