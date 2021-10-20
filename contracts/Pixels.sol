pragma solidity ^0.8.4;

contract Pixels {

    string[10][10] public pixels;
    address[10][10] public pixelOwners;

    event Purchased(uint x, uint y, string color, address owner);
    event Updated(uint x, uint y, string color, address owner);

    function getAllPixels() public view returns(string[10][10] memory) {
        return pixels;
    }

    function setPixel(uint x, uint y, string memory color) public payable {
        require(pixelOwners[x][y] == address(0), "Pixel already owned");
        require(msg.value >= 300000 wei, "Amount should be equal to 300000 wei");
        pixelOwners[x][y] = msg.sender;
        pixels[x][y] = color;
        emit Purchased(x, y, color, msg.sender);
    }

    function updatePixel(uint x, uint y, string memory color) public {
        require(pixelOwners[x][y] == msg.sender, "Pixel owned by other adress");
        pixels[x][y] = color;
        emit Updated(x, y, color, msg.sender);
    }

}