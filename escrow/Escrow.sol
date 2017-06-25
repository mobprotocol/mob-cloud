pragma solidity ^0.4.6;

contract Escrow {
    address public token;
    address public exchange;
    address public user;

    function Escrow(address _token, address _exchange) {
        token = _token;
        exchange = _exchange;
    }

    function deposit(address _token) returns (bool) {

    }

    function transfer() returns (bool) {

    }
}
