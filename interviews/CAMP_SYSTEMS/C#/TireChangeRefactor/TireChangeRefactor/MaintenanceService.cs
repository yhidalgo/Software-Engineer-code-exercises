using System;
using System.Collections.Generic;
using System.Linq;
using TireChangeRefactor.Model;

namespace TireChangeRefactor
{
    /// <summary>
    /// Service responsible for determining the maintenance that is required
    /// for aircrafts
    /// </summary>
    public class MaintenanceService
    {
        /// <summary>
        /// Gets all the aircraft that are due for a tire change.
        /// </summary>
        /// <returns>An array of aircraft that require tire changes according to mfg specifications</returns>
        public AircraftModel[] GetAllAircraftDueForTireChange()
        {
            // There are 3 aircraft manufactures, each with different requirements 
            //  for when the tires need to be changed
            //      FooPlane: 120 landings
            //      BarPlane: 75 landings
            //      BazPlane: 200 landings
            DAL.AircraftRepository repo = new DAL.AircraftRepository();
            AircraftModel[] allAircraft = repo.GetAll().ToArray(); 
            List<AircraftModel> requiresTireChange = new List<AircraftModel>();
            int numberOfAircrafts = allAircraft.Count();
            for (int i = 0; i < numberOfAircrafts; i ++)
            {
                int countLandingsSinceLastTireChange = 0;
                AircraftModel currentAircraft = allAircraft[i];
                DateTime lastTireChange = currentAircraft.LastTireChange;
                int numberOfLandings = currentAircraft.Landings.Count();
                for (int j = 0; j < numberOfLandings; j++)
                {
                    if (currentAircraft.Landings[j] >= lastTireChange)
                    {
                        // There is no need to store all the latest landing dates, 
                        // it is a waste of space that grows linearly ~ O(n)
                        countLandingsSinceLastTireChange++;
                    }
                }
                if (currentAircraft.Manufacturer == "FooPlane" && countLandingsSinceLastTireChange >= 120)
                    requiresTireChange.Add(currentAircraft);
                else if (currentAircraft.Manufacturer == "BarPlane" && countLandingsSinceLastTireChange >= 75)
                    requiresTireChange.Add(currentAircraft);
                else if (currentAircraft.Manufacturer == "BazPlane" && countLandingsSinceLastTireChange >= 200)
                    requiresTireChange.Add(currentAircraft);
            }
            return requiresTireChange.ToArray();
        }
    }
}
