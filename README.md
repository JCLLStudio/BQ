# SOE Bible Quiz
1. I-upload ang folder na ito sa GitHub (Settings > Pages > main / root). HUWAG i-upload ang questions.json.
2. Audio: assets/audio (q00.mp3 ... q25.mp3) at assets/audio/sfx (tingnan ang README.txt doon).
3. CONTROLLER (laptop ng Host): <site>/index.html > LOAD QUESTIONS > START GAME. Isang tab lang.
4. PROJECTOR (desktop na nakakabit sa LED): <site>/projector.html > i-click ang START PROJECTOR. Doon tutunog ang audio (puwedeng ilipat sa laptop gamit ang "Audio" button).
5. Groups: g1.html ... g9.html. Ang unang phone na kumonekta ang nagmamay-ari; gamitin ang DISCONNECT sa Controller para palitan.
6. CO-HOST: <site>/cohost.html, ilagay ang PIN na nasa Controller. Nakikita niya ang tanong, tamang sagot, clues, at status ng groups (walang controls).
7. Audience: <site>/audience.html (QR sa projector). Kailangan ng pangalan.
8. TIMER: 45 segundo ang sagutan. Kusa itong titigil (lock) kapag LAHAT ng nakakonektang groups (G1–G9) ay nakasagot na — hindi hinihintay ang audience. Kapag walang nakakonektang group, hanggang 45 segundo pa rin. Kapag may nag-disconnect na group na hindi pa nakakasagot, titigil din kung sagot na ang natitirang nakakonekta.
9. EDITOR NG TANONG: <site>/editor.html. Buksan ang questions.json (o "Kunin ang naka-install sa Host"), i-edit, tapos "I-download" o "Ipadala sa Host". May Form at Raw JSON view, at sinusuri nito ang bawat tanong (kailangan 26 items: 1 practice + 25, 4 choices, may tamang sagot). Awtomatikong nase-save ang draft sa browser.
10. REINSTALL QUESTIONS (Controller): papalitan ang naka-install na tanong gamit ang bagong JSON file. Hindi mabubura ang scores, at hindi puwede habang tumatakbo ang timer. Kapag nag-"Ipadala sa Host" ka sa Editor (parehong browser/laptop), lalabas ang REINSTALL FROM EDITOR. Hindi tatanggapin ang file na may error; mananatili ang dating mga tanong.

11. GROUP COLORS / LEADERS: lahat ng group identity ay nasa `js/groups.js`. Kapag nagbago ang kulay, color name, leader, o text color, i-edit lamang ang file na ito.
12. COLOR ACCESSIBILITY: Group phones use the full group color as background with G# + color name + leader. G9 uses white/dark text. Answer buttons A/B/C/D keep their original fixed colors and are placed inside a dark, white-bordered panel.
13. LEADERBOARD: bawat row ay may group color, color name, leader, rank movement (▲/▼), at points added sa kasalukuyang tanong. Final standings use cumulative answer time as the tie-breaker: kapag pantay ang points, mas mababang total answer time ang mauuna.
14. TOP AUDIENCE: top 3 audience scores lang ang ipinapakita sa Projector; full audience results remain in CSV.
15. GROUP CHAMPION PAGE: `champion.html` connects to the Controller and shows the final champion group using its group color and leader. Exact ties in both points and cumulative answer time are shown as co-champions.


### V7.3 Projector Timer Layout
During active/locked/reveal quiz states, the timer is fixed in the bottom-right of the projector status bar, while the G1–G9 status chips remain on the left. The original answer colors and overall projector layout are unchanged.
