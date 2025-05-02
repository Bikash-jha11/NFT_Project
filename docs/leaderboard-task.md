# Game Leaderboard Task

A simple Solidity + UI task for submitting and viewing game scores on-chain.

## Overview

This task implements a decentralized leaderboard system where players can:
- Submit their game scores to the blockchain
- View top scores from all players
- See their personal best score and rank

## Files Created

### Smart Contract
- `contracts/GameLeaderboard.sol` - Solidity contract for managing scores and leaderboard

### Frontend Integration
- `abis/leaderboard.ts` - Contract ABI for frontend integration
- `hooks/useLeaderboard.ts` - React hooks for interacting with the contract
- `components/leaderboard/Leaderboard.tsx` - UI component for displaying leaderboard and submitting scores
- `pages/leaderboard/index.tsx` - Page route for the leaderboard

### Configuration
- `constants/addresses.ts` - Updated with `LEADERBOARD_ADDRESS` (needs to be updated after deployment)
- `abis/index.ts` - Exports leaderboard ABI

## Features

1. **Submit Scores**: Players can submit scores with a game name
2. **Top Scores**: View top 100 scores sorted by highest first
3. **Player Stats**: See your best score and current rank
4. **On-chain Storage**: All scores are stored on the blockchain
5. **Events**: Contract emits events for score submissions

## Deployment Instructions

1. **Deploy the Contract**:
   ```bash
   # Using Hardhat, Foundry, or Remix
   # Deploy GameLeaderboard.sol to your target network
   ```

2. **Update Contract Address**:
   - Update `LEADERBOARD_ADDRESS` in `constants/addresses.ts` with the deployed contract address

3. **Access the UI**:
   - Navigate to `/leaderboard` in your application
   - Connect your wallet
   - Submit scores and view the leaderboard

## Contract Functions

- `submitScore(uint256 score, string memory gameName)` - Submit a new score
- `getTopScores(uint256 count)` - Get top N scores
- `getPlayerBestScore(address player)` - Get a player's best score
- `getPlayerRank(address player)` - Get a player's rank (0-indexed)
- `getTopScoresCount()` - Get total number of scores in leaderboard

## Usage Example

```typescript
import { useSubmitScore, useTopScores } from '@/hooks/useLeaderboard';

// In your component
const { submitScore, isLoading } = useSubmitScore();
const { scores } = useTopScores(10);

// Submit a score
await submitScore(1000, "My Game");
```

## Notes

- The contract maintains a maximum of 100 top scores
- Scores must be greater than 0
- Game names cannot be empty
- The contract uses a simple bubble sort (consider optimizing for production)

