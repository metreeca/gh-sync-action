/*
 * Copyright © 2025 Metreeca srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as core from "@actions/core";
import * as github from "@actions/github";

const token=core.getInput("token", { required: true });
const source=core.getInput("source", { required: true });
const target=core.getInput("target", { required: true });
const message=core.getInput("message", { required: true });

const octokit=github.getOctokit(token);

const { repo: { owner, repo } }=github.context;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

octokit.rest.repos.merge({

	owner,
	repo,

	base: target,
	head: source,

	commit_message: message
		.replace("{source}", source)
		.replace("{target}", target)

}).catch((error: unknown) => {

	core.setFailed(`failed to merge <${source}> into <${target}>: ${error}`);

});

