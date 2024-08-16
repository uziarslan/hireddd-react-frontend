import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axiosInstance from "../services/axiosInstance";
import { Link } from "react-router-dom";
import DashNav from "./DashNav";

export default function TalentSetting() {
  const { user } = useContext(AuthContext);
  const [tabName, setTabName] = useState("accountPreferences");
  const [message, setMessage] = useState({});
  const [privateAccount, setPrivateAccount] = useState(false);
  const [hideLikesAndShortlisted, setHideLikesAndShortlisted] = useState(false);
  const [hideBadges, setHideBadges] = useState(false);
  const [hideLocation, setHideLocation] = useState(false);
  const [likedNotification, setLikedNotification] = useState(false);
  const [shortlistedNotification, setShortlistedNotification] = useState(false);

  useEffect(() => {
    if (user) {
      setPrivateAccount(user.privateAccount);
      setHideLikesAndShortlisted(user.hideLikesAndShortlisted);
      setHideBadges(user.hideBadges);
      setHideLocation(user.hideLocation);
      setLikedNotification(user.likedNotification);
      setShortlistedNotification(user.shortlistedNotification);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const formData = {
        privateAccount,
        hideLikesAndShortlisted,
        hideBadges,
        hideLocation,
        likedNotification,
        shortlistedNotification,
      };

      try {
        axiosInstance.post("/talent/setting", formData);
      } catch (error) {
        console.error(error);
        setMessage(error.response.data);
      }
    }
  }, [
    privateAccount,
    hideLikesAndShortlisted,
    hideBadges,
    hideLocation,
    likedNotification,
    shortlistedNotification,
  ]);

  if (!user || !user.role === "talent") return null;
  return (
    <>
      <DashNav firstName={user.firstName} profile={user.profile.path} />
      <main id="main-section" class="main-section">
        <div class="wrapper wide-1230">
          <div class="profile-body-row account-setting-row-main">
            <div class="profile-sidebar-area account-setting-tabs">
              <div class="account-setting-sidebar-title">Settings</div>
              <div class="profile-sidebar-links">
                <Link
                  onClick={() => setTabName("accountPreferences")}
                  class={`profile-sidebar-link tab-link-main ${
                    tabName === "accountPreferences" ? "current" : ""
                  }`}
                >
                  <div className="profile-sidebar-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="32"
                        height="32"
                        fill="url(#pattern0_1516_2779)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_1516_2779"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            href="#image0_1516_2779"
                            transform="scale(0.0111111)"
                          />
                        </pattern>
                        <image
                          id="image0_1516_2779"
                          width="90"
                          height="90"
                          href="data:image/png;base64,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"
                        />
                      </defs>
                    </svg>
                  </div>
                  <div className="profile-sidebar-title">
                    Account Preferences
                  </div>
                </Link>
                <Link
                  onClick={() => setTabName("loginSecurity")}
                  class={`profile-sidebar-link tab-link-main ${
                    tabName === "loginSecurity" ? "current" : ""
                  }`}
                >
                  <div class="profile-sidebar-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="32"
                        height="32"
                        fill="url(#pattern0_1516_2788)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_1516_2788"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            href="#image0_1516_2788"
                            transform="scale(0.0111111)"
                          />
                        </pattern>
                        <image
                          id="image0_1516_2788"
                          width="90"
                          height="90"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFA0lEQVR4nO2dTYgcVRCAn4K/0YOe/EEhJxX/QdSLv6gX9eBFPMgeJLoqGC9qPKgLopiwjjNVXdXLkOBA1CxW7YIIivhziGiMEoPByxrJwZ8swRgTknXNuoSRmh0libOzs7Pd/bqn3wd12e3trvp48/rte2+6nQsEAoFAIBAIBAKBwInU6/XTEGU1sNyGLENI+iKwAJC8hSwfIMlXSDqFJHuA9A8LZJ1B1mY7Zv77OckeOxZYt9nf2jnsXHZOO3frGiir7ZpuEKlslPMx1luQZBhINyDrOLB8gaS/Iuux46RlFcfs2pYDsGxp5UQybDlari7vVCpyFsSTN0esjwNrBKSfIes+DyKbK4x9lrvVYLVUSW+y2rzKbTQaZwLLU0D6NbLM50BSM52QeST5JmJ52mrOVHJlTC5Gkl3+JWi2QbLLas9EMsCHZwDLd96LZj9htZuD1EXbR8h3seg7SNemLtr6K++Fsu+Q7amLBpI//ReqvmMmddE5KLKZhwiiOYhu+m6FoUVzdwnA+jFEsqYay2Wjo5tXWSBOXI6kjwLJJ0H0ClsRsP5QpYlbl7xB26QRye7QorkfybI1jt85r9ebjk0KAcnnoevg5bXk5Ug+QTbrj6GP5l5FT9zR7/BpYX473Aybvdz43ApBlk/DqIOXEB3Jmk7yRkROb0/UTwPrXiRZbz/r2KpjeSyI5u6ibQjXsZWSrO/Q+l/reKwN/cI4WruKJpJzFhE9/b/jSaY7HWvnCKK5u+jF+91kjk8qXNr4KgCD6CA6FUKL1tB1HE/oozn00T2R2B4O0jlkeS6KtlzkUsauAbGuW7hmEvcUmU87Z3fS/re+A2Jd5zKmJTuJ3FmPpJ4skh5IItkog5Z8MnbNhD6N+1NPNqlpSOeJhERPpZ5oazdoyUUDy9YsEtWyi0aWd9NPtMMsWtlEA8urqScKpI+UXTSyDKWf6JjcWHbRUaQ3pJ6obVlFlqNlFQ2kfy22spNCsrK9tKJZt2WWLLC8XF7Rkv6N8F+sjyqr6GoPO6cSo9lsntL+Clu5RJMeyPy7ikAyVjrRrBszTxhY7ymd6HjirswTbncfU6URTbJ7ZGTkVD9Jk64tjWiWJ33l7DZseu9cID1UlPnoin0RtT/JBxfb2JMZSFopygoLkjzfV66srzvftFvJ8pe3SOdMdt7XDG3ZysenryPA8lL/fZ/mO0hecHnBHrWApD95l8JJh/xSr79/tssTyPqwfzGaaNQiecjlDRtX225933IwoQCWj6wml0daNx2W331LwpUG6f436pMXujxTi+SBwrdm0gddEQDWRoElv+mKgj17qPU4tRyIw+UE6Y7cjTKWgkguANKfC9OSWfdm9rykpIFYr09qUySmK/kI4uS1rsjYHC6yzvqW2SVmMZY73SAQRXK3LdPnQGqnPdr3ukEiivS+JPaDJBdy1HJyg0gU6e39zl8n25LlsC3FuUGGSK/0Ohohma6SXOfKQK0ulwLLtx765B3M45e4MtGwh8iSbspQ9NuF+2ckSYDkiZSHf7P2iGLfdeaCKo9fgSQ7U+iPv6+xXuO7vlwBth2Y9BUg/TuBvnjONmJmtr22iESRXL3wrP6+W/GXtXjyKt91FAbgiftbL0noUfDCkFGGcrsqkv/uRJ61FY8ukn8D1mcyeXj2oDM6unmVjU7ar/842HotSOvtFzJsv/OdXyAQCAQCgUAgEAi4IvMPPa08rYTN1OMAAAAASUVORK5CYII="
                        />
                      </defs>
                    </svg>
                  </div>
                  <div class="profile-sidebar-title">Login and Security</div>
                </Link>
                <Link
                  onClick={() => setTabName("notifications")}
                  class={`profile-sidebar-link tab-link-main ${
                    tabName === "notifications" ? "current" : ""
                  }`}
                >
                  <div class="profile-sidebar-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="32"
                        height="32"
                        fill="url(#pattern0_1516_2783)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_1516_2783"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            href="#image0_1516_2783"
                            transform="scale(0.0111111)"
                          />
                        </pattern>
                        <image
                          id="image0_1516_2783"
                          width="90"
                          height="90"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFu0lEQVR4nO2c24scRRSH22vUBxEUEe9GjRe8i/ikD+qrCOKzlz9ARQwiIhl9MK6a3Zk6fao34wZXkHXgnJlEg8a3REQwXpCEQAiCxERj4iWrMbu4PoSR2h0na7Z7uqq7Zqpnun5wYBm2z1R9c7r61KmqDgIvLy8vLy8vLy8vLy+v7Jqenj4nlPSsQP4SJM8tGe0E5GeE2LYqh2uv/yRE63JA2g2S23EmJO1S/9O9wCtbJPeC/H/YPrIzSw0XaZCXwX46+zeVXGJpTNYCDUhfuG7v0EpIPq4f0XzcdXuHUvV6/SztaO6YusZ1u4dG1YhuAKQxkHzEFDQgHwXkek3yba77UVgh0nUC+UNjuIlGHwjRuNZ1vwqWwvF6kLRgD3IX9oLyrb4jKLPC8P1LjTKLrIb0ba1OVwZlVBX5XkD6ue+QT2Ylh2qydU9QJtWi1i0g6Y9BQV5mx6pIdwRl0PgkXSaQDzqA3I1sxOZVQZHVbrdPy3O9ENtW6dQu+g+bdlWIznbJIjkzkBwJpHmB/DdInqrXt55n6kdIfsU15GWw15m2X/VZIG/qMJgDJLRazBKSRMwtuNHIxyTdDMj/uAZ80mihKhs3mXHgjSs4INcCW2NqLCCkv0xuH4H8kXu4K/qwVbf9qq/xtRdaUGlqZsBdQJLWxd56yLO6PsKwsQYkn3AOdqWdUDNSbRbIfyb8YC8HeVSpVE4H5P0JjZzSbqDksABQY00Ni9r9QN6UAPr7XA/HGvKDiQ2M+E4dH0R0hqOcWQ808qxqoxboiO5O9BXRA5lBq0wj4Rfco+tDzcagAEB7WRi27tJmkpSeImFm0IkTC6TntRsm6QXXIFOjWvJabSaS18Yz4QOZIKuHRHIENNZoN8xq6ZP7Axppi1G9PMHPRNRcbQwakJ6M//XpBxM/QtLXrkGmGtJXZmz4QLwvetzKJMU02+jdKC6OIe83YoP8TkIQThiDBsmfxDmrRfyEWaNo3jnIdJsz6VMo6amEiP7YHDTSd7GgDWu6BYDY1jHjWnr8nbHPHLTkX+OcRVHr4rKDRqRL4nwIpF/MQScUgEyrVaMIWqhyb6wfWvCgpT3Q4+N0rj3QfugY1NDhH4aDehhaSe9GcYwObaZ31iYso/gwRJsTFgtT8KUSqXuIOqZbKu2APmhtCt6rqFSbbF6v46Na3XKBa4CgaUK8d75OnwCaNyb6AbomcFEmlbJxhWuAoGlqbTRPmdS02HYqaJkAerfO9QCt210DBE0LQ7pVq09Ie6wX/vMuZQmkx1wDBH171NlSVq/FWSHp7bTrAfmlAgBsaxnSi6n9kTzVl8XZXtsN1E5QjYY1nAOUeiaQZzT6c6Qv2w1SNtCkgx7gtlzIbfRjWn+E5MN920DTAfbWigiQ/HrmNEgW09LS1s7ZmlM5vBlYPSGFNKa2vC5GKfL6SmXHmb0bxc+5BgeGlnYoVHFQAaYiW7FQf6dx6LsA+RvX4MDYaGcwTFK3oHtonMnUdoJgWNSjINUuumUqDLlQGG6+0ORoMRTP5jbUZy4Kii4h6bUCwGrnMuRXgyJLneXrvCGmPcwmkOark42rg6IKJG92DQnsGQdFlEB+pABw2lYjWzYfDook9U4jIen3kQONPFuYM4lLsyX63DUU6Bts+sz5e0BUaRCQ3nUNA/of2TOqZOwMtJC8wTUEGBRsyeFA4aqjvQL5jeEqgbIt2KqoNpb3eLOW4kqFpTOksUGALl0kw8rIPtx30Iu3jyx7RPNPfQfthw5OXV2yIvUg6K62lG/IODSwh6GXl5eXl5eX12hI2FnYPea6H4UXIO+zMHPb67ofhRckbY01m1gYvSqulIKo+VDuiM6zKbxMAqTtOYaNT123f2g0ETVXA/JvGSAfNXmPnVegjgE371er0CaQIeL7PLyMu1KFpB3pkGm7j2QLqqnTYch1lbapPHsx10beu/iZf/B5eXkFI6t/AZTQPwp8ZNsfAAAAAElFTkSuQmCC"
                        />
                      </defs>
                    </svg>
                  </div>
                  <div class="profile-sidebar-title">Notifications</div>
                </Link>
              </div>
            </div>
            <div class="profile-content-area account-setting-tabs-content">
              <div
                class={`tabbed-content-main ${
                  tabName === "accountPreferences" ? "current" : ""
                }`}
              >
                <div class="account-setting-row">
                  <div class="account-setting-left ">
                    <div class="account-setting-title">Display Language</div>
                    <p>Select your language you want to display.</p>
                  </div>
                  <div class="account-setting-right">
                    <div class="input-sets">
                      <div class="input-set">
                        <input
                          checked
                          name="language"
                          type="radio"
                          id="english"
                        />
                        <label for="english">English</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="account-setting-row">
                  <div class="account-setting-left">
                    <div class="account-setting-title">Private account</div>
                    <p>
                      When your account is public, your profile, video resume
                      and can be seen by anyone, on or off hireddd.
                    </p>
                  </div>
                  <div class="account-setting-right">
                    <div class="input-sets">
                      <div class="input-set">
                        <input
                          name="private-account"
                          type="checkbox"
                          checked={privateAccount}
                          onChange={(e) => setPrivateAccount(e.target.checked)}
                          id="private-account"
                        />
                        <label for="private-account"></label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="account-setting-row">
                  <div class="account-setting-left">
                    <div class="account-setting-title">
                      Hide likes and shortlisted
                    </div>
                    <p>
                      The number of likes and shortlisted on your video resume
                      will be hidden from other.
                    </p>
                  </div>
                  <div class="account-setting-right">
                    <div class="input-sets">
                      <div class="input-set">
                        <input
                          name="private-account2"
                          type="checkbox"
                          checked={hideLikesAndShortlisted}
                          onChange={(e) =>
                            setHideLikesAndShortlisted(e.target.checked)
                          }
                          id="private-account2"
                        />
                        <label for="private-account2"></label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="account-setting-row">
                  <div class="account-setting-left">
                    <div class="account-setting-title">Hide badges</div>
                    <p>
                      The earned badges on your profile will be hidden from
                      other.
                    </p>
                  </div>
                  <div class="account-setting-right">
                    <div class="input-sets">
                      <div class="input-set">
                        <input
                          name="private-account3"
                          type="checkbox"
                          id="private-account3"
                          onChange={(e) => setHideBadges(e.target.checked)}
                          checked={hideBadges}
                        />
                        <label for="private-account3"></label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="account-setting-row">
                  <div class="account-setting-left">
                    <div class="account-setting-title">Hide Location</div>
                    <p>
                      The location on your profile will be hidden from other.
                    </p>
                  </div>
                  <div class="account-setting-right">
                    <div class="input-sets">
                      <div class="input-set">
                        <input
                          name="private-account4"
                          type="checkbox"
                          id="private-account4"
                          checked={hideLocation}
                          onChange={(e) => setHideLocation(e.target.checked)}
                        />
                        <label for="private-account4"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class={`tabbed-content-main ${
                  tabName === "loginSecurity" ? "current" : ""
                }`}
              >
                <div class="account-setting-row">
                  <div class="account-setting-left">
                    <div class="account-setting-title">Liked notification</div>
                    <p>
                      When your account is public, your profile, video resume
                      and can be seen by anyone, on or off hireddd.
                    </p>
                  </div>
                  <div class="account-setting-right">
                    <div class="input-sets">
                      <div class="input-set">
                        <input
                          name="liked-notification"
                          type="checkbox"
                          id="liked-notification"
                          checked={likedNotification}
                          onChange={(e) =>
                            setLikedNotification(e.target.checked)
                          }
                        />
                        <label for="liked-notification"></label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="account-setting-row">
                  <div class="account-setting-left">
                    <div class="account-setting-title">
                      Shortlisted notifications
                    </div>
                    <p>
                      The number of likes and shortlisted on your video resume
                      will be hidden from other.
                    </p>
                  </div>
                  <div class="account-setting-right">
                    <div class="input-sets">
                      <div class="input-set">
                        <input
                          name="shortlisted-notification"
                          type="checkbox"
                          id="shortlisted-notification"
                          checked={shortlistedNotification}
                          onChange={(e) =>
                            setShortlistedNotification(e.target.checked)
                          }
                        />
                        <label for="shortlisted-notification"></label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="account-setting-row">
                  <div class="account-setting-left">
                    <div class="account-setting-title">Message badges</div>
                    <p>
                      The earned badges on your profile will be hidden from
                      other.
                    </p>
                  </div>
                  <div class="account-setting-right">
                    <div class="input-sets">
                      <div class="input-set">
                        <input
                          name="message-badges"
                          type="checkbox"
                          id="message-badges"
                        />
                        <label for="message-badges"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class={`tabbed-content-main ${
                  tabName === "notifications" ? "current" : ""
                }`}
              >
                <div class="account-setting-row">
                  <div class="account-setting-left">
                    <div class="account-setting-title">Liked notification</div>
                    <p>
                      When your account is public, your profile, video resume
                      and can be seen by anyone, on or off hireddd.
                    </p>
                  </div>
                  <div class="account-setting-right">
                    <div class="input-sets">
                      <div class="input-set">
                        <input name="2" type="checkbox" id="2" />
                        <label for="2"></label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="account-setting-row">
                  <div class="account-setting-left">
                    <div class="account-setting-title">
                      Shortlisted notifications
                    </div>
                    <p>
                      The number of likes and shortlisted on your video resume
                      will be hidden from other.
                    </p>
                  </div>
                  <div class="account-setting-right">
                    <div class="input-sets">
                      <div class="input-set">
                        <input
                          name="shortlisted-notification2"
                          type="checkbox"
                          id="shortlisted-notification2"
                        />
                        <label for="shortlisted-notification2"></label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="account-setting-row">
                  <div class="account-setting-left">
                    <div class="account-setting-title">Message badges</div>
                    <p>
                      The earned badges on your profile will be hidden from
                      other.
                    </p>
                  </div>
                  <div class="account-setting-right">
                    <div class="input-sets">
                      <div class="input-set">
                        <input
                          name="message-badges2"
                          type="checkbox"
                          id="message-badges2"
                        />
                        <label for="message-badges2"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
