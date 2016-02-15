import Rx                     from "rx";

export default {

  /**
   * Initiates data creation via RxJS
   * @param  {*}      data                  Data we're populating
   * @param  {object} subscribingObserver   The RxJS observer that should pay attention to this
   */
  streamDataToObserver(data, subscribingObserver) {
    console.log("streaming data to observer", data); //eslint-disable-line no-console
    Rx.Observable
      .create((currentObserver) => {
        // Step 1
        // Updates all subscribers, creating a stream
        currentObserver.onNext(data);
      })
      // Step 2
      // Subscribe the observer to what we just made
      // Point the stream to the create intent
      .subscribe(subscribingObserver);
  }

};
