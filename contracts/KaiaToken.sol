// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KaiaToken is ERC20, Ownable {
    address public constant DEV_WALLET = 0x89aeE78C7E068cD63E0Fd42D278Af146A9511aFc;
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10**18; // 10억 토큰
    uint256 public constant DEV_AMOUNT = 10_000_000 * 10**18; // 1천만 토큰

    constructor(
        string memory name,
        string memory symbol,
        address initialOwner
    ) ERC20(name, symbol) Ownable(initialOwner) {
        _mint(initialOwner, TOTAL_SUPPLY - DEV_AMOUNT);
        _mint(DEV_WALLET, DEV_AMOUNT);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
} 