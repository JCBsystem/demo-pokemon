# Work time

Method: timestamps in the project's Claude Code session logs
(`~/.claude-b/projects/-Users-mrb-Documents-Projects-demo-pokemon/*.jsonl`).

- **At keyboard**: MrB's typed messages only, summed where consecutive gaps are
  under 10 min. A gap over 10 min = away. Waiting on agents is not counted.
- **Autonomous run**: agent activity (any message) outside the at-keyboard
  blocks. Agents building by themselves. Logged, not billed as worked time.

## Summary (MrB's time)

| Part                                                                            | Minutes         |
| ------------------------------------------------------------------------------- | --------------- |
| Init: 18 Oct 12:29–14:31, from the first commit (no session log for this phase) | 122             |
| At keyboard with the agents, 18 Oct 17:11–23:40 (10 min gap rule)               | 164             |
| Tooling friction, not project work (gate, plugin, memory): estimate             | −30             |
| **Worked**                                                                      | **256 (4.3 h)** |

Budget: 4 h. Not counted: reading the reports, writing the after-report and the
client email (19 Oct). Agents' autonomous run (2.7 h) logged below, not billed.

## At keyboard

| Block | Time               | Minutes         | What                                                          |
| ----- | ------------------ | --------------- | ------------------------------------------------------------- |
| 1     | 18 Oct 17:11–18:27 | 76              | pre-planning review, action plan, plugin setup, agent run one |
| 2     | 18 Oct 22:02–22:41 | 39              | commit gate validation, group 3 (tests + CI/CD)               |
| 3     | 18 Oct 22:51–23:40 | 49              | Firebase secret, data layer, briefing the overnight run       |
|       | **At keyboard**    | **164 (2.7 h)** | 19 Oct 15:14–15:20 (6 min, reading results) not counted       |

## Autonomous run

| Time                      | Minutes         | What                                                      |
| ------------------------- | --------------- | --------------------------------------------------------- |
| 18 Oct 18:27–18:56        | 29              | agent run one finishing while MrB away                    |
| 18 Oct 23:40–19 Oct 01:55 | 135             | four version builds, reviews, deploys (parallel managers) |
|                           | **164 (2.7 h)** |                                                           |

Overnight figure: last typed message 23:40, last agent write 01:55 (worktree
commits 00:xx–01:5x, task output files). Subagent transcripts are not in the
main log, so the recount script below shows only fragments of this block.

## Recount

```
cd ~/.claude-b/projects/-Users-mrb-Documents-Projects-demo-pokemon && python3 -I - <<'PY'
import json,glob,datetime
user=[];allm=[]
for f in glob.glob('*.jsonl'):
    for line in open(f,errors='ignore'):
        try: d=json.loads(line)
        except: continue
        t=d.get('timestamp')
        if not t or d.get('type') not in ('user','assistant'): continue
        ts=datetime.datetime.fromisoformat(t.replace('Z','+00:00')); allm.append(ts)
        if d['type']=='user' and not d.get('isSidechain') and not d.get('isMeta'):
            c=d.get('message',{}).get('content')
            if isinstance(c,str) and c.strip() and not c.startswith('<'): user.append(ts)
            elif isinstance(c,list) and any(b.get('type')=='text' and not b.get('text','').startswith('<') for b in c): user.append(ts)
user.sort(); allm.sort()
def blocks(ts,gap):
    out=[]; s=p=ts[0]
    for t in ts[1:]:
        if (t-p).total_seconds()>gap*60: out.append((s,p)); s=t
        p=t
    out.append((s,p)); return out
f=lambda t:t.astimezone().strftime('%d %H:%M')
ub=blocks(user,10); tot=0
print('At keyboard (10 min gap):')
for s,e in ub:
    m=(e-s).total_seconds()/60; tot+=m; print(f'  {f(s)}-{f(e)}  {m:.0f}')
print(f'  total {tot:.0f} min = {tot/60:.1f} h')
print('Autonomous run (agent activity outside those blocks, 20 min gap):'); tot=0
for s,e in blocks(allm,20):
    cov=sum(max(0,(min(e,ue)-max(s,us)).total_seconds()) for us,ue in ub)
    un=(e-s).total_seconds()-cov
    if un>120: print(f'  {f(s)}-{f(e)}  {un/60:.0f}'); tot+=un
print(f'  total {tot/60:.0f} min = {tot/3600:.1f} h')
PY
```
