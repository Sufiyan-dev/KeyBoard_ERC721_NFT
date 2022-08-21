const { loadFixture} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Setting up", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("KeyboardNFT");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();
    console.log(hardhatToken.address);

    // Fixtures can return anything you consider useful for your tests
    return { Token, hardhatToken, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { hardhatToken, owner} = await loadFixture(deployTokenFixture);
      console.log(hardhatToken.owner());
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
  });

  describe("Validations", function () {
    it("should revert error for non whitelisted memeber", async function () {
      const {hardhatToken, owner, addr1, addr2} = await loadFixture(deployTokenFixture);
      expect(await hardhatToken.connect(addr1).awardItem(addr1.address,"first nft")).expect.fail("Only owner or whiteListed members allowed");
    });
  });

  //describe("Validations", function () {
    //describe("Validations", function () {
      // it("Should revert with the right error if called too soon", async function () {
      //   const { lock } = await loadFixture(deployOneYearLockFixture);

      //   await expect(lock.withdraw()).to.be.revertedWith(
      //     "You can't withdraw yet"
      //   );
      // });

      // it("Should revert with the right error if called from another account", async function () {
      //   const { lock, unlockTime, otherAccount } = await loadFixture(
      //     deployOneYearLockFixture
      //   );

      //   // We can increase the time in Hardhat Network
      //   await time.increaseTo(unlockTime);

      //   // We use lock.connect() to send a transaction from another account
      //   await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
      //     "You aren't the owner"
      //   );
      // });

      // it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
      //   const { lock, unlockTime } = await loadFixture(
      //     deployOneYearLockFixture
      //   );

      //   // Transactions are sent using the first signer by default
      //   await time.increaseTo(unlockTime);

      //   await expect(lock.withdraw()).not.to.be.reverted;
      // });
    //});

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  //});
});
