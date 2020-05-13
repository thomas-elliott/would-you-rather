using System.Collections.Generic;
using System.Linq;
using WouldYouRather.Entities;
using WouldYouRather.Models;

namespace WouldYouRather.Services
{
    public class PlayDataService
    {
        private Queue<Player> _playersQueue = new Queue<Player>();

        private AnswerResponse _previousChoiceA = null;
        private AnswerResponse _previousChoiceB = null;

        public void SetPreviousChoiceA(AnswerResponse choice)
        {
            _previousChoiceA = choice;
        }

        public void SetPreviousChoiceB(AnswerResponse choice)
        {
            _previousChoiceB = choice;
        }

        public AnswerResponse GetPreviousChoiceA()
        {
            return _previousChoiceA;
        }

        public AnswerResponse GetPreviousChoiceB()
        {
            return _previousChoiceB;
        }

        public bool PlayersQueueEmpty()
        {
            return _playersQueue.Count == 0;
        }

        public void PopulatePlayerQueue(IEnumerable<Player> players)
        {
            foreach (var p in players)
            {
                _playersQueue.Enqueue(p);
            }
        }

        public Player GetNextPlayer()
        {
            return _playersQueue.Dequeue();
        }

        public void AddPlayer(Player player)
        {
            _playersQueue.Enqueue(player);
        }

        public void RemovePlayer(Player player)
        {
            if (PlayerInQueue(player))
            {
                _playersQueue = new Queue<Player>(
                    _playersQueue.Where(p => p != player));
            }
        }

        public bool PlayerInQueue(Player player)
        {
            return _playersQueue.Contains(player);
        }
    }
}